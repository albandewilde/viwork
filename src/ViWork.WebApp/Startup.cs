﻿using System;
using System.Security.Claims;
using System.Text;
using ViWork.DAL;
using ViWork.WebApp.Authentication;
using ViWork.WebApp.Controllers;
using ViWork.WebApp.Services;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace ViWork.WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddMvc();
            services.AddSingleton(_ => new UserGateway(Configuration["ConnectionStrings:ViWorkDB"]));
            services.AddSingleton(_ => new GroupGateaway(Configuration["ConnectionStrings:ViWorkDB"]));
            services.AddSingleton(_ => new SchemaGateaway(Configuration["ConnectionStrings:ViWorkDB"]));
            services.AddSingleton<PasswordHasher>();
            services.AddSingleton<UserService>();
            services.AddSingleton<GroupService>();
            services.AddSingleton<SchemaService>();
            services.AddSingleton<TokenService>();
            services.AddSingleton<GitHubService>();
            services.AddSingleton<GitHubClient>();
            //services.AddSingleton<GoogleAuthenticationManager>();
            services.AddSingleton<GithubAuthenticationManager>();

            string secretKey = Configuration["JwtBearer:SigningKey"];
            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            services.Configure<TokenProviderOptions>(o =>
            {
                o.Audience = Configuration["JwtBearer:Audience"];
                o.Issuer = Configuration["JwtBearer:Issuer"];
                o.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            services.Configure<SpaOptions>(o =>
            {
                o.Host = Configuration["Spa:Host"];
            });

            services.AddAuthentication(CookieAuthentication.AuthenticationScheme)
                .AddCookie(CookieAuthentication.AuthenticationScheme, o =>
                {
                    o.ExpireTimeSpan = TimeSpan.FromHours(1);
                    o.SlidingExpiration = true;
                })
                .AddJwtBearer(JwtBearerAuthentication.AuthenticationScheme, o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,

                        ValidateIssuer = true,
                        ValidIssuer = Configuration["JwtBearer:Issuer"],

                        ValidateAudience = true,
                        ValidAudience = Configuration["JwtBearer:Audience"],

                        NameClaimType = ClaimTypes.Email,
                        AuthenticationType = JwtBearerAuthentication.AuthenticationType,

                        ValidateLifetime = true
                    };
                })
                //.AddGoogle(o =>
                //{
                //    o.SignInScheme = CookieAuthentication.AuthenticationScheme;
                //    o.ClientId = Configuration["Authentication:Google:ClientId"];
                //    o.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
                //    o.Events = new OAuthEvents
                //    {
                //        OnCreatingTicket = ctx => ctx.HttpContext.RequestServices.GetRequiredService<GoogleAuthenticationManager>().OnCreatingTicket(ctx)
                //    };
                //    o.AccessType = "offline";
                //})
                .AddOAuth("GitHub", o =>
                {
                    o.SignInScheme = CookieAuthentication.AuthenticationScheme;
                    o.ClientId = Configuration["Authentication:Github:ClientId"];
                    o.ClientSecret = Configuration["Authentication:Github:ClientSecret"];
                    o.CallbackPath = new PathString("/signin-github");

                    o.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
                    o.TokenEndpoint = "https://github.com/login/oauth/access_token";
                    o.UserInformationEndpoint = "https://api.github.com/user";

                    o.Scope.Add("user");

                    o.Events = new OAuthEvents
                    {
                        OnCreatingTicket = ctx => ctx.HttpContext.RequestServices.GetRequiredService<GithubAuthenticationManager>().OnCreatingTicket(ctx)
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(c =>
            {
                c.AllowAnyHeader();
                c.AllowAnyMethod();
                c.AllowCredentials();
                c.WithOrigins(Configuration["Spa:Host"]);
            });

            string secretKey = Configuration["JwtBearer:SigningKey"];
            SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });
            });

            app.UseStaticFiles();
        }
    }
}

declare var ViWork: any;

class AuthService {
    public appRedirect: any;
    public allowedOrigins: any;
    public providers: any;
    public logoutEndpoint: any;


    private authenticatedCallbacks: any;
    private signedOutCallbacks: any;

    constructor() {
        this.allowedOrigins = [];
        this.providers = {};
        this.logoutEndpoint = null;
        this.appRedirect = () => null;
        this.authenticatedCallbacks = [];
        this.signedOutCallbacks = [];

        window.addEventListener('message', (e) => this.onMessage(e), false);
    }

    get identity() {
        return ViWork.getIdentity();
    }

    set identity(i) {
        ViWork.setIdentity(i);
    }

    get isConnected() {
        return this.identity != null;
    }

    get accessToken() {
        const identity = this.identity;

        return identity ? identity.bearer.access_token : null;
    }

    get email() {
        const identity = this.identity;

        return identity ? identity.email : null;
    }

    public hisEmail() {
        const identity = this.identity;
        return (identity.email);
    }

    get boundProviders() {
        const identity = this.identity;

        return identity ? identity.boundProviders : [];
    }

    public isBoundToProvider(expectedProviders: any) {
        let isBound = false;

        for ( const p of expectedProviders) {
            if ( this.boundProviders.indexOf(p) > -1){
                isBound = true;
            }
        }

        return isBound;
    }

    public onMessage(e: any) {
        if (!e.origin || this.allowedOrigins.indexOf(e.origin) < 0 || e.data === '') {return; }
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if ( data.type === 'authenticated') { this.onAuthenticated(data.payload); 
        } else if (data.type === 'signedOut') { this.onSignedOut(); }
    }

    public login(selectedProvider: any) {
        const provider = this.providers[selectedProvider];
        const popup = window.open(
            provider.endpoint,
            'Connexion',
            'menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=700');
    }

    public registerAuthenticatedCallback(cb: any) {
        this.authenticatedCallbacks.push(cb);
    }

    public removeAuthenticatedCallback(cb: any) {
        this.authenticatedCallbacks.splice(this.authenticatedCallbacks.indexOf(cb), 1);
    }

    public onAuthenticated(i: any) {
        this.identity = i;

        for ( const cb of this.authenticatedCallbacks) {
            cb();
        }
    }

    public logout() {
        const popup = window.open(
            this.logoutEndpoint,
             'Déconnexion',
              'menubar=no, status=no, scrollbars=no, menubar=no, width=700, height=600');
    }

   public registerSignedOutCallback(cb: any) {
        this.signedOutCallbacks.push(cb);
    }

    public removeSignedOutCallback(cb: any) {
        this.signedOutCallbacks.splice(this.signedOutCallbacks.indexOf(cb), 1);
    }

   public onSignedOut() {
        this.identity = null;

        for( const cb of this.signedOutCallbacks) {
            cb();
        }
    }

    public async getToken() {
        let host: any;
        const result = await fetch(host + '/api/token', {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (result.ok) {
            const token = await result.json();
            if (token.success) return token;
        }

        return null;
    }

    public async refreshToken() {
        this.identity = await this.getToken();
    }

   public  async init() {
        const token = await this.getToken();
        if (token !== null) this.onAuthenticated(token);
    }
}

export default new AuthService();

<template>
    <div class="modal fade" id="ModalSignUp" tabindex="-1" role="dialog" aria-labelledby="ModalSignUpLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="ModalSignUpLabel">Inscription</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <button type="button" @click="login('GitHub')" class="btn btn-lg btn-block btn-primary">
                              <i class="fa fa-github" aria-hidden="true"></i>S'inscrire avec GitHub</button>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
</template>

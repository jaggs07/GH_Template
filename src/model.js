export const INITIAL_STATE = {
    client: {
        data:[],
        loading:false,
        error:{}
    },

    user: {
        loading: false,
        data:{},
        error:{},
        detail: {},
        updateSuccess: false,
        passwordChangeSuccess: false
    },
    job: {
      loading: false,
      data:[],
      error:{},
  }
}

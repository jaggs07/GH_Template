export const INITIAL_STATE = {
    fetch: {
        loading:false,
        error:{}
    },

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

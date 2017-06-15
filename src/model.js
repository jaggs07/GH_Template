export const INITIAL_STATE = {
    employer: {
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
      boardToken: '',
      companyName: ''
  }
}

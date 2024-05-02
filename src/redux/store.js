import { configureStore } from '@reduxjs/toolkit'
import user_loginRducer from './user_loginRducer'
import boite_disscussion from './boite_disscussion'
export const store = configureStore({
  reducer: {

    user_login:user_loginRducer,
    boite_disscussion:boite_disscussion,
  },
})
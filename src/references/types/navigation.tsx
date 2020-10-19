import {moviesType} from './moviesType'

export type StackParamsList = {
    Home: undefined,
    Detail: {
        item: moviesType
    }
}
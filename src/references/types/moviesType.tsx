export type genreType = {
    id: number,
    name: string,
}
type productionType = {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}
type countryType = {
    iso_3166_1: string,
    name: string
}
type languageType = {
    iso_639_1: string,
    name: string
}
export type moviesType = {
    adult?: boolean,
    backdrop_path?: string,
    budget?: number,
    genre_ids?: number[],
    genres?: genreType[],
    id?: number,
    imdb_id?: number,
    original_language?: string,
    original_title?: string,
    overview?: string,
    popularity?: number,
    poster_path?: string,
    production_companies?: productionType[],
    production_countries?: countryType[],
    release_date?: string,
    revenue?: number,
    runtime?: number,
    status?:string,
    spoken_languages?: languageType[],
    tagline?: string,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number,
    
}
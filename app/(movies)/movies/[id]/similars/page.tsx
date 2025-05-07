// import Link from "next/link";
import Link from "next/link";
import Movie from "../../../../../components/movie";
import styles from "../../../../../styles/movie-similar.module.css";
import { API_URL } from "../../../../constant";
import { getMovie } from "../../../../../components/movie-info";

interface IParams {
    params : {id : string;}
};

async function getSimilars(id : string) {
    const response = await fetch(`${API_URL}/${id}/similar`);
    const json = await response.json();
    return json;
}

export default async function SimilarMovies({params : {id}} : IParams) {
    const similars = await getSimilars(id);
    const movie = await getMovie(id);
    const movieName = movie.title;
    return (
        <div className={styles.wrapper}>
            <div className={styles.topDiv}>
                <Link prefetch href={`/movies/${id}`}>&larr;Back</Link>
                <h5 className={styles.title}>Credits of [ {movieName} ]</h5>
            </div>
            <div className={styles.container}>
            {similars.map((similar) => (
                <Movie 
                key={similar.id} 
                id={similar.id} 
                poster_path={similar.poster_path} 
                title={similar.title}
                adult={similar.adult}
                />   
            ))}
            </div>
        </div>
    )
}

export const runtime = "edge";
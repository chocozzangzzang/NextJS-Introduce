import Link from "next/link";
import styles from "../styles/movie-info.module.css";
import { API_URL } from './../app/constant';

export async function getMovie(id : string) {
    // console.log(`Fetching movies : ${Date.now()}`);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieInfo({id} : {id : string}) {
    const movie = await getMovie(id);
    return (
        <div className={styles.container} >
            <img src={movie.poster_path} 
            className={styles.poster}
            alt={movie.title}/>
            <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>
                <h3>Release Date : {movie.release_date}</h3>
                <h3> ★ {movie.vote_average.toFixed(1)}</h3>
                <p>{movie.overview}</p>
                <a href={movie.homepage} target={"_blank"}>Homepage &rarr;</a>
                <Link prefetch href={`/movies/${id}/similars`}>Similars &rarr;</Link>
            </div>
        </div>
    )
}

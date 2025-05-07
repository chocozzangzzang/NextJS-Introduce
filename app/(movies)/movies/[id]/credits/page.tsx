import Link from "next/link";
import { getTopCredits } from "../../../../../components/movie-credits";
import { getMovie } from "../../../../../components/movie-info";
import styles from "../../../../../styles/movie-credit-page.module.css";

interface IParams {
    params: {id: string;};
}

export async function generateMetadata({ params : {id} } : IParams) {
    const movie = await getMovie(id);

    return {
        title : "Credits of " + movie.title,
    }
}

export default async function MovieCredits({params : {id}} : IParams) {
    
    const credits = await getTopCredits(id);
    const movie = await getMovie(id);
    const movieName = movie.title;
    const moviePoster = movie.poster_path;
    
    return (
        <div className={styles.wrapper} 
            style={{
                "backgroundImage" : `url(${moviePoster})`,
                "backgroundRepeat" : "no-repeat",
                "backgroundSize" : "cover",
                "backgroundPosition" : "center"}}>
            <div className={styles.textDiv}>
                <Link prefetch href={`/movies/${id}`}>&larr;Back</Link>
                <h5 className={styles.title}>Credits of [ {movieName} ]</h5>
            </div>
            <div className={styles.creditPage}> 
                {credits.map((credit) => {
                    return (
                        <div className={styles.profileBox}>
                            <img className={styles.imgBox} 
                            src={credit.profile_path ? credit.profile_path : "https://www.gravatar.com/avatar/?d=mp"}></img>
                            <p className={styles.realName}>{credit.original_name}</p>
                            <p className={styles.characterName}>{credit.character}</p>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}
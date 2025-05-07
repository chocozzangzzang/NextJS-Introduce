import { getMovie } from "./movie-info";
import styles from "../styles/movie-credit.module.css";
import { API_URL } from "../app/constant";
import Link from "next/link";

export async function getTopCredits(id : string) {
    const response = await fetch(`${API_URL}/${id}/credits`);
    return response.json();
}

export default async function MovieCredits({id} : {id : string}) {
    const topCredits = await getTopCredits(id);
    const partTopCredits = topCredits.slice(0, 4);
    return (
        <div className={styles.totalContainer}>
            <h5 className={styles.title}>Top Credits</h5>
            <div className={styles.creditContainer}>
            {
                partTopCredits.map((topCredit) => {
                    return (
                        <div className={styles.container}>
                            <img className={styles.imgBox} 
                            src={topCredit.profile_path} 
                            alt={topCredit.name} />
                            <div className={styles.titleBox}>
                                <p className={styles.realName}>{topCredit.original_name}</p>
                                <p className={styles.characterName}>{topCredit.character}</p>
                            </div>
                        </div>
                    )
                })
            }
            <div className={styles.allActors}>
                <Link prefetch href={`/movies/${id}/credits`}>all actors &rarr;</Link>
            </div>       
            </div>
        </div>
    );
}
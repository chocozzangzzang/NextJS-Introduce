// import { Metadata } from "next"
// import { API_URL } from "../../../(home)/page"
import MovieVideos from "../../../../components/movie-videos"
import MovieInfo, { getMovie } from "../../../../components/movie-info"
import { Suspense } from "react"

interface IParams {
    params: {id: string};
}

export async function generateMetadata({ params: { id } }: IParams) {
    const movie = await getMovie(id);

    return {
        title : movie.title,
    }
}

// export const metadata : Metadata = {
//     title : "Movie Detail",
// }

export default async function MovieDetailPage({ params: { id } }: IParams) {

    return (
        <div>
            {/* <h3>Movie Detail Page</h3> */}
            <Suspense fallback={<h1>Loading movie info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            {/* <h3>Videos</h3> */}
            <Suspense fallback={<h1>Loading movie video</h1>}>
                <MovieVideos id={id} />
            </Suspense>
        </div>
    )
}

export const runtime = "edge"
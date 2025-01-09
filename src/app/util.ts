import Nominees from "./noms";

export interface Movie {
    id: string;
    title: string;
    watched: number;
    release: number;
    rating: number;
    grade: string;
    actor: string | null;
    actorName: string | null;
    actorId: string | null;
    supporting: string | null;
    suppName: string | null;
    suppId: string | null;
    scene: string | null;
    sceneTitle: string | null;
    ending: string | null;
    movie: string | null;
}

export function normalizeTitle(title: string): string {
    return title.replace(/^(A|The)\s+/i, "").trim();
}


export const createNomineeObject = (
    title: string,
    movies: Movie[],
    filterKey: "actorId" | "suppId" | "ending" | "movie" | "scene",
    imagePath: string,
    imageType: 'png' | 'jpg',
    getDescription: (film: Movie) => string
  ) => ({
    type: Nominees,
    props: {
      title,
      images: movies
        .filter((film) => film[filterKey] != null)
        .map((film) => {return ((filterKey == 'actorId') || (filterKey == 'suppId')) ?
                 `${imagePath}/${film[filterKey]?.toLowerCase()}_${film.id.toLowerCase()}.${imageType}` :
                 `${imagePath}/${film.id.toLowerCase()}.${imageType}`
                }),
      descriptions: movies
        .filter((film) => film[filterKey] != null)
        .map(getDescription),
    },
});
  
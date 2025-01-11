import Nominees from "./noms";
import Winner from "./winner";

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

export interface Nominee {
    category: string,
    movies: Movie[],
    filterKey: "actor" | "supporting" | "ending" | "movie" | "scene",
    displayKey: "actorId" | "suppId" | "id",
    imagePath: "/actor" | "/film" | "/supp" | "/scene",
    getDescription: (film: Movie) => [string,string]
}

// TODO: breaks if two noms for 
export function createNomineeObject(input: Nominee){
    const imageType = input.imagePath == "/film" ? "jpg" : "png";
    return {
        type: Nominees,
        props: {
            category: input.category,
            images: input.movies
                .filter((film) => film[input.filterKey] != null)
                .map((film) => {return ((input.displayKey == 'actorId') || (input.displayKey == 'suppId')) ?
                        `${input.imagePath}/${film[input.displayKey]?.toLowerCase()}_${film.id.toLowerCase()}.${imageType}` :
                        `${input.imagePath}/${film.id.toLowerCase()}.${imageType}`
                        }),
            descriptions: input.movies
                .filter((film) => film[input.filterKey] != null)
                .map(input.getDescription),
            dimensions: input.filterKey === "scene" ? [3,2] : [2,3]
        },
    };
  }

export interface Winner {
    category: string,
    movies: Movie[],
    filterKey: "actor" | "supporting" | "ending" | "movie" | "scene",
    displayKey: "actorId" | "suppId" | "id",
    imagePath: "/actor" | "/film" | "/supp" | "/scene",
    getDescription: (film: Movie) => [string,string]
}

export function createWinnerObject(input: Winner){
    const winner = input.movies.filter((film) => film[input.filterKey] == "Winner")[0];
    const second = input.movies.filter((film) => film[input.filterKey] == "Second")[0];
    const imageType = input.imagePath == "/film" ? "jpg" : "png";
    return {
        type: Winner,
        props: {
            category:input.category,
            image: ((input.displayKey == 'actorId') || (input.displayKey == 'suppId')) ?
                        `${input.imagePath}/${winner[input.displayKey]?.toLowerCase()}_${winner.id.toLowerCase()}.${imageType}` :
                        `${input.imagePath}/${winner.id.toLowerCase()}.${imageType}`
                    ,
            first: input.getDescription(winner),
            second: input.getDescription(second)
        }
    };
}
  
import Nominees from "./noms";
import Winner from "./winner";
import Transition from "./transition";

export interface Movie {
    id: string;
    title: string;
    watched: number;
    release: number;
    rating: number;
    grade: string;
    actor: string[];
    actorName: string[];
    actorId: string[];
    supporting: string[];
    suppName: string[];
    suppId: string[];
    scene: string[];
    sceneTitle: string[];
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
    getDescription: (film: Movie) => [string,string][]
}

export interface NomineesProp {
    category: string,
    images: string[],
    descriptions: [string,string][],
    dimensions:[number,number]
}

export interface NomineeOutput {
    type: React.ComponentType<NomineesProp>,
    props: NomineesProp
}

// TODO: attempt to be robust for movies with multiple noms
export function createNomineeObject(input: Nominee):NomineeOutput{
    const imageType = input.imagePath == "/film" ? "jpg" : "png";
    const films_with_nominees = input.movies
                .filter((film) => {
                    if(input.filterKey == 'ending' || input.filterKey == 'movie'){
                        return film[input.filterKey] != null;
                    }
                    return film[input.filterKey].length > 0;
                });
    const image_paths:string[] = [];
    const descriptions:[string,string][] = [];
    films_with_nominees.forEach(film => {
        if((input.displayKey == 'actorId') || (input.displayKey == 'suppId')){
            film[input.displayKey]?.forEach((actor) => {
                image_paths.push(`/${film.watched.toString()}${input.imagePath}/${actor.toLowerCase()}_${film.id.toLowerCase()}.${imageType}`);
            });
        }
        else if(input.filterKey == 'scene'){
            film[input.filterKey]?.forEach((_,idx) => {
                image_paths.push(`/${film.watched.toString()}${input.imagePath}/${film.id.toLowerCase()}${idx}.${imageType}`);
            });   
        }
        else {
            image_paths.push(`/${film.watched.toString()}${input.imagePath}/${film.id}.${imageType}`);
        }
        descriptions.push(...input.getDescription(film));
    });
    return {
        type: Nominees,
        props: {
            category: input.category,
            images: image_paths,
            descriptions: descriptions,
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
    getDescription: (film: Movie,idx:number) => [string,string]
}

export interface WinnerProp {
    category: string,
    image: string,
    first: [string,string],
    second:[string,string]
}

export interface WinnerOutput {
    type: React.ComponentType<WinnerProp>,
    props: WinnerProp
}

export function createWinnerObject(input: Winner):WinnerOutput{
    const winner = input.movies.filter((film) => {
        if(input.filterKey == 'actor' || input.filterKey == 'supporting' || input.filterKey == 'scene'){
            return film[input.filterKey].some(entry => entry == "Winner");
        }
        return film[input.filterKey] == "Winner";
    })[0];
    const second = input.movies.filter((film) => {
        if((input.filterKey == 'actor') || (input.filterKey == 'supporting') || (input.filterKey == 'scene')){
            return film[input.filterKey].some(entry => entry == "Second");
        }
        return film[input.filterKey] == "Second";
    })[0];
    const imageType = input.imagePath == "/film" ? "jpg" : "png";

    let winner_idx = 0;
    let second_idx = 0;
    if((input.filterKey == 'actor') || (input.filterKey == 'supporting') || (input.filterKey == 'scene')){
        winner_idx = winner[input.filterKey]?.indexOf('Winner') ?? 0;
        second_idx = second[input.filterKey]?.indexOf('Second') ?? 0;
    }

    let image_path;
    if((input.displayKey == 'actorId') || (input.displayKey == 'suppId')){
        const winning_actor = (winner[input.displayKey] as string[])[winner_idx];
        image_path = `/${winner.watched.toString()}${input.imagePath}/${winning_actor.toLowerCase()}_${winner.id.toLowerCase()}.${imageType}`;
    }
    else {
        image_path = `/${winner.watched.toString()}${input.imagePath}/${winner.id}.${imageType}`;
    }
    

    return {
        type: Winner,
        props: {
            category:input.category,
            image: image_path,
            first: input.getDescription(winner,winner_idx),
            second: input.getDescription(second,second_idx)
        }
    };
}

export interface Transition {
    message:string
}

export interface TransitionProp {
    message:string
}

export interface TransitionOutput {
    type: React.ComponentType<TransitionProp>,
    props: TransitionProp
}

export function createTransitionObject(input:Transition):TransitionOutput {
    return {
        type: Transition,
        props: {
            message: input.message
        }
    }
}
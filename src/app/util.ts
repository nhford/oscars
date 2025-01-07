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
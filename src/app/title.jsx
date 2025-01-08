import Image from "next/image";

function Trophy() {
    return (
        <Image
            src="/oscar.png"
            alt="trophy"
            height={200}
            width={200}
            style={{ height: 'calc(3 * 2rem)', width: 'auto' }} // Dynamically set height
        />
    );
}

export default function Title() {
    return (
        <div className="flex items-center justify-center gap-2 my-5">
            <Trophy />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-black">Noah Oscars</h1>
            <Trophy />
        </div>
    );
}
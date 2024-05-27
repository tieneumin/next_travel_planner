import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between bg-sky-500 text-white p-4">
      <Link
        href="/"
        className="text-lg hover:text-sky-700 transition duration-300 ease-in-out"
      >
        Travel Planner App
      </Link>
      <div className="flex gap-4">
        <Link
          href="/"
          className="hover:text-sky-700 transition duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          href="/new"
          className="hover:text-sky-700 transition duration-300 ease-in-out"
        >
          New Trip
        </Link>
      </div>
    </div>
  );
}

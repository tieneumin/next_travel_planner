import Link from "next/link";
import { PrismaClient } from "@prisma/client";

// set up db connection via prisma
const db = new PrismaClient();

export default async function Home() {
  // get trips data from db
  const trips = await db.trip.findMany();
  // console.log(trips);

  return (
    <div className="2xl:container mx-auto max-w-screen-xl m-4">
      <p className="text-2xl font-semibold uppercase mb-4">Upcoming Trips</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {trips.length > 0 ? (
          trips.map((t) => {
            return (
              // size-fit alternative to w-full
              <div className="w-full p-4 border-2 shadow-md rounded-md">
                <p className="text-xl font-bold mb-2">{t.destination}</p>
                <p className="text-sm mb-1">
                  Date: {t.startDate.toISOString().split("T")[0]} -{" "}
                  {t.endDate.toISOString().split("T")[0]}
                </p>
                <p className="text-sm mb-4">Budget: RM{t.budget}</p>
                <div className="text-center">
                  <Link
                    href={"/trips/" + t.id}
                    className="p-2 bg-sky-50 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-300 ease-in-out"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-2xl text-center">No trips created.</p>
        )}
      </div>
    </div>
  );
}

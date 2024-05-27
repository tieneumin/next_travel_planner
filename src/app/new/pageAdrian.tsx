export default function TripNew() {
  return (
    // Adrian's HTML/Tailwind
    <div className="bg-gray-100 ">
      <div className="flex items-center justify-center min-h-screen flex-col">
        <p className="text-4xl pb-5">Add New Trip</p>
        <form className="bg-white p-8 rounded-lg border border-black max-w-lg w-full">
          <div className="grid grid-rows-1 md-4">
            <input
              type="text"
              id="Destination"
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Destination"
            />
          </div>
          <div className="grid grid-rows-1 grid-cols-2 pt-5 gap-1">
            <input
              type="date"
              id="Destination"
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              id="Destination"
              className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-rows-1 grid-cols-1 pt-5">
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
          </div>
          <div className="grid grid-rows-1 grid-cols-1 pt-5">
            <button className="rounded-none ">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <section className="w-full   bg-[#5D4B8C] px-4 py-12 md:px-6 lg:px-8">
      <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2 max-w-7xl">
        <div className="space-y-8">
          <h1 className="text-center gap-4 text-4xl font-bold tracking-tight text-white md:text-5xl xl:text-6xl">
            Get your new book with the best price
          </h1>
          <p className="text-lg text-white/80 text-center">
            Quis nostrud exercitation ullamco laboris aliquip commodo consequat.
            Duis aute reprehenderit in voluptate.
          </p>
          <div className="flex  w-full items-center justify-center space-x-2 ">
            <Input
              type="search"
              placeholder="Search books, authors etc"
              className="bg-white w-48 md:w-96"
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap bg-white text-[#6B5B95] hover:bg-white/90"
            >
              Search
            </Button>
          </div>
        </div>
        <div className=" mx-auto w-full max-w-lg">
          <div className="">
            {/* Main book */}
            <img
              src="https://static.live.templately.com/woocommerce/2023/03/6072e019-bookplace-bannerbg.png"
              alt="Think Smart Not Hard Book Cover"
            />
            {/* Background books for stack effect */}
          </div>
        </div>
      </div>
    </section>
  );
}

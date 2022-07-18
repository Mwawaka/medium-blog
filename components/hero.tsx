const Hero = () => {
    return (
        <div className="container flex items-center justify-between bg-yellow-500 border-y border-black py-10 lg:py-0 "> 
            <div className="px-10 space-y-6">
                <h1 className="text-6xl max-w-xl font-serif "><span className="underline decoration-black decoration-4">Medium</span> is a place to write, read and connect</h1>
                <h2>
                    It's easy and free to post your thinking on any topic and connect with millions of readers.
                </h2>
            </div>
            <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="Medium-logo" className="hidden md:inline-flex md:h-32 lg:h-full"/>

        </div>
    )
}

export default Hero;


export default function Contact() {
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Contact Us
            </h1>
            <div className="text-l leading-6 text-[var(--custom-orange)] !mb-4">
                <p>
                    <strong>Email:</strong> {" "}
                    <a
                        href="mailto:feedthismuch@gmail.com"
                        className="underline hover:text-[#4f759b]"
                    >
                        feedthismuch@gmail.com
                    </a>
                </p>
                <p>
                    <strong>Instagram:</strong>{" "}
                    <a
                        href="https://instagram.com/feedthismuch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#4f759b]"
                    >
                        @feedthismuch
                    </a>
                </p>
            </div>
        </div>
    )
}
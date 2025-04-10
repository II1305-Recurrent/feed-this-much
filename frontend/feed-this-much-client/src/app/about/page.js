"use client"

export default function About() {
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                About Us
            </h1>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                We&apos;re a team of students from KTH working on a group project for the II1305 course.
                Our goal is to build a web app that creates personalized feeding plans for pet owners, tailored to their pet&apos;s unique needs and lifestyle based
                on the food information they provide.
            </p>
        </div>
    )
}
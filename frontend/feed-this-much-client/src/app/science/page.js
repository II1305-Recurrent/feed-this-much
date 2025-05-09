export default function Science() {
    const cats = [
        { details: "Neutered or Indoor Adult", energyBase: 314 },
        { details: "Active Adult (Outdoor and Intact)", energyBase: 418 },
        { details: "Kitten (0-1 year old)", energyBase: 314 }
    ]
    const catage = [
        { age: "Up to 4 months", lifeStage: "2.5" },
        { age: "4 to 9 months", lifeStage: "2.0" },
        { age: "9 to 12 months", lifeStage: "1.5" },
        { age: "Adult (over 1 year)", lifeStage: "1.0" }
    ]
    const dogs = [
        { activityLevel: "low (<1 hour/day) (e.g. walking on the lead)", activityBase: 398 },
        { activityLevel: "moderate (1-3 hrs/day low impact activity)", activityBase: 460 },
        { activityLevel: "moderate(1 - 3 hrs / day high impact activity)", activityBase: 523 },
        { activityLevel: "high activity(3- 6 hrs / day working dog)", activityBase: 680 },
        { activityLevel: "high activity extreme (such as racing sled dogs in cold conditions)", activityBase: 4395 },

    ];
    const dogage = [
        { age: "1-2 years", lifeStage: "1.3" },
        { age: "3-7 years", lifeStage: "1.0" },
        { age: ">7 years", lifeStage: "0.87" }
    ]
    return (
        <div className="page">
            <h1 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                The Science
            </h1>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                Our formulas are derived from: <a className="!underline" href="https://europeanpetfood.org/wp-content/uploads/2024/09/FEDIAF-Nutritional-Guidelines_2024.pdf">”Nutritional Guidelines For Complete and
                    Complementary Pet Food for Cats and Dogs” October 2024</a>, by FEDIAF, the
                European pet food industry.<br /><br />
                Calculating a daily energy allowance for dogs requires one formula for adult
                dogs and two different formulas for puppies (dogs under 1 year old).<br />
                The formula for cats is relatively simple, however, it was recently changed in 2024, so our results may be different from what other calculators produce.<br />
                Please not: There are additional formulas for pregnant and lactating animals, which are not included at this point.
            </p><br />
            <h2 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Cats
            </h2>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                The formula for cats is: energyBase ∗ BodyWeight^0.67 ∗ lifeStageFactor<br />
                The energyBase to use is determined by the cat&apos;s age and whether or not they are spayed/neutered and the lifeStageFactor is determined by the cat’s age. See the tables below.
            </p>
            <br />
            <table className="border-separate border-collapse margin-spacing-x-4 border !mx-auto">
                <thead>
                    <tr>
                        <th className="border-r text-[var(--custom-orange)] ">Cat details</th>
                        <th className="!px-4 text-[var(--custom-orange)] ">activityBase</th>
                    </tr>
                </thead>
                <tbody>
                    {cats.map((cat, index) => (
                        <tr key={index}>
                            <td className="border-r border-t !px-4 text-[var(--custom-orange)] ">{cat.details}</td>
                            <td className="border-t !px-4 text-[var(--custom-orange)] ">{cat.energyBase}</td>
                        </tr>
                    ))}
                </tbody>
            </table><br />
            <table className="border-separate border-collapse margin-spacing-x-4 border !mx-auto">
                <thead>
                    <tr>
                        <th className="border-r text-[var(--custom-orange)] ">Cat Age</th>
                        <th className="!px-4 text-[var(--custom-orange)] ">lifeStageFactor</th>
                    </tr>
                </thead>
                <tbody>
                    {catage.map((cat, index) => (
                        <tr key={index}>
                            <td className="border-r border-t !px-4 text-[var(--custom-orange)] ">{cat.age}</td>
                            <td className="border-t !px-4 text-[var(--custom-orange)] ">{cat.lifeStage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h2 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Adult dogs
            </h2>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">The daily energy allowance for an adult dog is given by: energyBase ∗ BodyWeight^0.75<br />
                The energyBase for dogs is given by: energyBase = activityBase ∗ lifeStageFactor<br />
                The activityBase to use is determined by the dog&apos;s activity level and the lifeStageFactor is by it&apos;s age, as shown in the table below.
            </p>
            <br />
            <table className="border-separate border-collapse margin-spacing-x-4 border !mx-auto">
                <thead>
                    <tr>
                        <th className="border-r text-[var(--custom-orange)] ">Dog Activity Level</th>
                        <th className="!px-4 text-[var(--custom-orange)] ">activityBase</th>
                    </tr>
                </thead>
                <tbody>
                    {dogs.map((dog, index) => (
                        <tr key={index}>
                            <td className="border-r border-t !px-4 text-[var(--custom-orange)] ">{dog.activityLevel}</td>
                            <td className="border-t !px-4 text-[var(--custom-orange)] ">{dog.activityBase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <table className="border-separate border-collapse margin-spacing-x-4 border !mx-auto">
                <thead>
                    <tr>
                        <th className="border-r text-[var(--custom-orange)] ">Dog Age</th>
                        <th className="!px-4 text-[var(--custom-orange)] ">lifeStageFactor</th>
                    </tr>
                </thead>
                <tbody>
                    {dogage.map((dog, index) => (
                        <tr key={index}>
                            <td className="border-r border-t !px-4 text-[var(--custom-orange)] ">{dog.age}</td>
                            <td className="border-t !px-4 text-[var(--custom-orange)] ">{dog.lifeStage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Puppies (newborn to 8 weeks old)
            </h2>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                The daily energy allowance for a newborn to 8-week-old puppy is given by: 1050 ∗ BodyWeight<br />
                This formula is based on the requirement that this age group get 105KJ for each 100g of their current body weight.<br />
            </p>
            <h2 className="scroll-m-20 text-2xl text-[var(--custom-orange)] font-bold tracking-tight lg:text-5xl !mb-3">
                Puppies (8 weeks to 1 year old)
            </h2>
            <p className="text-l leading-5 text-[var(--custom-orange)] [&:not(:first-child)]:mt-4">
                The daily energy allowance for puppies in this age group is given by:<br />
                (1063 − 565 ∗ (currentBodyWeight / expectedAdultWeight)) ∗ currentBodyWeight^0.75
            </p>
        </div>
    )
}
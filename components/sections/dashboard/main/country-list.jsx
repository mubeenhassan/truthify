import Image from "next/image"

export function CountryList({ countries }) {
  return (
    <ul className="space-y-3.5">
      {countries.map((country) => (
        <li key={country.name}>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center">
              <Image
                width={16}
                height={16}
                src={country.flag || "/placeholder.svg"}
                alt={`${country.name} flag`}
                className="w-4 h-4 mr-2 rounded-sm object-cover"
              />
              <p className="text-sm font-semibold text-zinc-800">
                {(country.value / 1000).toFixed(0)}k{" "}
                <span className="text-xs font-normal text-neutral-400">{country.name}</span>
              </p>
            </div>
            <p
              className={`text-xs font-semibold flex items-center ${
                country.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              <Image
                width={12}
                height={12}
                src={country.trend === "up" ? "/icons/arrow-up-green.svg" : "/icons/arrow-down-red.svg"}
                alt=""
                className="h-3 w-3 mr-0.5"
              />
              {country.percentage}%
            </p>
          </div>
          <div className="w-full bg-indigo-100 rounded-full h-1.5">
            <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${country.percentage * 2.5}%` }}></div>
          </div>
        </li>
      ))}
    </ul>
  )
}

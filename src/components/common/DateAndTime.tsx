interface DateAndTimeProps {
	date: string
}

export default function DateAndTime({ date }: DateAndTimeProps) {
	const dateObject = new Date(date)

	const year = dateObject.getFullYear()
	const month = String(dateObject.getMonth() + 1).padStart(2, "0") // Months are zero-based
	const day = String(dateObject.getDate()).padStart(2, "0")
	const hours = String(dateObject.getHours()).padStart(2, "0")
	const minutes = String(dateObject.getMinutes()).padStart(2, "0")
	const seconds = String(dateObject.getSeconds()).padStart(2, "0")

	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

	return <time dateTime={formattedDate}>{formattedDate}</time>
}

export type Education = {
  institution: string
  degree: string
  field: string
  website: string
  // Leave dates undefined until confirmed — nothing is rendered for them.
  startDate?: string
  endDate?: string
}

// Ordered most recent first.
export const education: Education[] = [
  {
    institution: "Bangladesh University",
    degree: "BSc",
    field: "Computer Science & Engineering",
    website: "https://bu.edu.bd/",
  },
  {
    institution: "Patuakhali Government Polytechnic Institute",
    degree: "Diploma in Engineering",
    field: "Computer Science & Engineering",
    website: "https://patuakhali.polytech.gov.bd/",
  },
]

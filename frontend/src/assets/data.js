import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Spalane kalorie",
    icon: (
      <LocalFireDepartmentRounded sx={{ color: "inherit", fontSize: "26px" }} />
    ),
    desc: "Całkowita liczba spalonych kalorii dzisiaj",
    key: "totalCaloriesBurnt",
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Treningi",
    icon: <FitnessCenterRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Całkowita liczba treningów dzisiaj",
    key: "totalWorkouts",
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Średnie spalone kalorie na treningu",
    icon: <TimelineRounded sx={{ color: "inherit", fontSize: "26px" }} />,
    desc: "Średnia liczba spalonych kalorii na treningach",
    key: "avgCaloriesBurntPerWorkout",
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];

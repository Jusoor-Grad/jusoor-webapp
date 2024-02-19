import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const data = [
  {
    day: "Sun",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    day: "Mon",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    day: "Tue",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    day: "Wed",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    day: "Thu",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    day: "Fri",
    A: 65,
    B: 85,
    fullMark: 150,
  },
  {
    day: "Sat",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function RadarGraph() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RadarChart
        cx={200}
        cy={200}
        outerRadius={150}
        width={400}
        height={400}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="day" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#0D9488"
          fill="#0D9488"
          strokeWidth={2}
          fillOpacity={0.2}
        />
      </RadarChart>
    </div>
  );
}

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type LinePlotType = {
    options?: ChartOptions<"line">;
    data: ChartData<"line">;
    className?: string;
};

const LinePlot = ({ options = {}, data, className = "" }: LinePlotType) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <Line options={options} data={data} />
        </div>
    );
};

export default LinePlot;

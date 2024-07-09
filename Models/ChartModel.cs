namespace DotNetChartJS.Models
{
    public class ChartModel
    {
        public ChartTypes TypeEnum { get; set; }

        public string type => Enum.GetName(typeof(ChartTypes), TypeEnum) ?? string.Empty;

        public string label { get; set; } = string.Empty;

        public string chartId { get; set; } = string.Empty;

        public string[] labels { get; set; } = Array.Empty<string>();

        public enum ChartTypes { pie, doughnut, bar, line, bubble, polarArea, radar, scatter, mixed }

        public ChartDataset[] datasets { get; set; } = Array.Empty<ChartDataset>();

        public class ChartDataset
        {
            public string type { get; set; } = string.Empty;

            public string label { get; set; } = string.Empty;

            public int[]? data { get; set; }

            public BubbleData[]? dataBubble { get; set; }

            public ScatterData[]? dataScatter { get; set; }

            public string[] backgroundColor { get; set; } = Array.Empty<string>();

            public string[] borderColor { get; set; } = Array.Empty<string>();

            public string pointBackgroundColor { get; set; } = string.Empty;

            public string pointBorderColor { get; set; } = string.Empty;

            public string pointHoverBackgroundColor { get; set; } = string.Empty;

            public string pointHoverBorderColor { get; set; } = string.Empty;

            public class BubbleData : ChartDataset
            {
                public int x { get; set; }
                public int y { get; set; }
                public int r { get; set; }
            }

            public class ScatterData : ChartDataset
            {
                public int x { get; set; }
                public int y { get; set; }
            }
        }

    }
}

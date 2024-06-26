<template>
    <div id="chart"></div>
</template>

<script>
import * as d3 from 'd3';
import debounce from 'lodash/debounce';

export default {
    name: 'ForceChart',
    props: {
        nodes: Array,
        links: Array
    },
    watch: {
        nodes: {
            handler() {
                this.drawChart();
            },
            deep: true,
        },
        links: {
            handler() {
                this.drawChart();
            },
            deep: true,
        }
    },
    methods: {
        drawChart: debounce(function () {
            d3.select("#chart").select('svg').remove();

            // Specify the dimensions of the chart.
            const width = 1000;
            const height = 680;
            const apColor = '#96b3a2';
            const clientColor = '#f4a261';

            // Specify the color scale.
            const color = d3.scaleOrdinal(d3.schemeCategory10);

            // The force simulation mutates links and nodes, so create a copy
            // so that re-evaluating this cell produces the same result.
            const nodes = JSON.parse(JSON.stringify(this.nodes));
            const links = JSON.parse(JSON.stringify(this.links));

            // Create a simulation with several forces.
            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id).distance(80))
                .force("charge", d3.forceManyBody().strength(-200))
                .force("x", d3.forceX())
                .force("y", d3.forceY());

            // Create the SVG container.
            const svg = d3.select('#chart').append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                .attr("style", "max-width: 100%; height: auto;");

            // Add a line for each link, and a circle for each node.
            const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", d => Math.log(d.value));

            const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", d => d.size)
                .attr("fill", d => {
                    if (d.isMock) {
                        return "#ff0000"; // Color for mock nodes
                    } else {
                        return d.group === 'accessPoint' ? apColor : clientColor;
                    }
                });

            const labels = svg.append("g")
                .selectAll("text")
                .data(nodes)
                .join("text")
                .text(d => d.title)
                .style("text-anchor", "middle")
                .style("fill", "#555")
                .style("font-family", "Arial")
                .style("font-size", 12);

            node.append("title")
                .text(d => d.title);

            // Add a drag behavior.
            node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

            // Set the position attributes of links and nodes each time the simulation ticks.
            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);

                labels
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            });

            // Reheat the simulation when drag starts, and fix the subject position.
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            // Update the subject (dragged node) position during drag.
            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            // Restore the target alpha so the simulation cools after dragging ends.
            // Unfix the subject position now that it’s no longer being dragged.
            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return svg.node();
        }, 100),
    }
}
</script>

<style>
#chart {
    background-color: aliceblue;
}
</style>
import * as d3 from 'd3';

import {AncestorChart} from './topola-chart';
import {JsonDataProvider, JsonGedcomData} from './topola-data';
import {SimpleRenderer} from './topola-render';

export interface RenderOptions {
  jsonUrl: string;
  startId: string;
  indiUrl?: string;
}

/** A simplified API for rendering data based on the given RenderOptions. */
export function render(options: RenderOptions): void {
  d3.json(options.jsonUrl).then((json) => {
    const data = new JsonDataProvider(json as JsonGedcomData);
    const indiUrlFunction = options.indiUrl ?
        (id: string) => options.indiUrl.replace('${id}', id) :
        undefined;
    const renderer = new SimpleRenderer(data, indiUrlFunction);
    const chart = new AncestorChart(data, renderer, options.startId);
    chart.render();
  });
}

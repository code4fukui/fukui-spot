# fukui-spot

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository aggregates and provides open data on tourist spots in Fukui Prefecture, Japan. Data is scraped from official tourism websites, processed into various formats, and updated automatically every month.

## Demos and Open Data

This project generates several datasets and corresponding web-based visualizations.

| Category | Visualizations | Open Data Formats |
|---|---|---|
| **All Fukui Spots** | [List](https://code4fukui.github.io/fukui-spot/) / [Map](https://code4fukui.github.io/fukui-spot/map.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot.csv) / [JSON-LD](https://code4fukui.github.io/fukui-spot/fuku-e-spot.jsonld) |
| **Dinosaur-Themed Spots** | [Map](https://code4fukui.github.io/fukui-spot/dinomap.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-dino.csv) |
| **Spots Missing Geolocation** | [List](https://code4fukui.github.io/fukui-spot/errdata.html) | (Filtered from the main CSV) |

### Multilingual Data

Data is also available in multiple languages, sourced from the "ENJOY FUKUI" website.

| Language | Visualization | Open Data Format |
|---|---|---|
| **English** | [List](https://code4fukui.github.io/fukui-spot/list-eng.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-eng.csv) |
| **Simplified Chinese** | [List](https://code4fukui.github.io/fukui-spot/list-chi-CN.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-chi-CN.csv) |
| **Traditional Chinese** | [List](https://code4fukui.github.io/fukui-spot/list-chi-TW.html) | [CSV](https://code4fukui.github.io/fukui-spot/fuku-e-spot-chi-TW.csv) |

## Automation

The data is kept current via a GitHub Actions workflow defined in `.github/workflows/scheduled-fetch.yml`.
- The workflow runs automatically on the first day of every month.
- It executes the Deno scripts in the `/deno` directory to scrape the latest information from the source websites.
- The scripts generate updated CSV and JSON-LD files.
- The workflow commits the new data back to this repository.

## Manual Data Update

To run the data update process manually, you need Deno v1.x installed.

The following commands will clear the local cache of scraped HTML pages (`src
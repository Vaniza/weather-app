import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { WeatherDatas } from '../../../../models/interfaces/weatherDatas';
import { Subject, takeUntil } from "rxjs";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-weather-home",
  templateUrl: "./weather-home.component.html",
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  initialCityName = 'São Paulo';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private WeatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.WeatherService.getWeatherData(cityName)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: any) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: (error: any) => console.log(error),
    });
  }

  onSubmit(): void {
    this.getWeatherData(this.initialCityName);
    this.initialCityName = '';
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

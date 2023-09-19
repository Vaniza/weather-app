import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../../services/weather.service";
import { WeatherDatas } from '../../../../models/interfaces/weatherDatas';

@Component({
  selector: "app-weather-home",
  templateUrl: "./weather-home.component.html",
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit {
  initialCityName = 'São Paulo';
  weatherDatas!: WeatherDatas;

  constructor(private WeatherService: WeatherService) {}

  ngOnInit(): void {
      this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.WeatherService.getWeatherData(cityName).subscribe({
      next: (response: any) => {
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas);
      },
      error: (error: any) => console.log(error),
    });
  }
}

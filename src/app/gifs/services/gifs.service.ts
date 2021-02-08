import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'gzWjW8niNBjPc3tQ3YV2PDNfoHFke7JS';
  private url: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')!);
      this.getImages(this._history[0]);
    }
  }

  searchGifs(query: string): void {
    query = query.trim().toLocaleLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }
  }

  getImages(query: string): void {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.url}/search?`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
      });
  }

}

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/im-Amitto/bd05d63d439573472355d21e7b274e08/raw/lummo__pull_2.json)

## Architecture - K8s
> Redis uses a persistent volume so even on restart or crash, the data will not be lost  

> All deployment are configued in a way that during an update, they won't have any down-time 

![](./images/k8s.png)

## Running the app

```bash
# development - docker
$ docker-compose up dev

# prod - docker
$ docker-compose up prod

# prod - k8s
$ cd k8s && kubectl apply -f .
```
> Docker version will be live @ [http://localhost:5000](http://localhost:5000/api)

## API Docs
[http://localhost:5000/api/](http://localhost:5000/api/) can be used instead of postman to quick test availble API endpoints.
![](./images/api.png)

## CI Pipelines

1. [Kraken CI](https://github.com/im-Amitto/lummo/actions/workflows/ci.yaml)  
    - Run jest specs  
    - Keeps track of `Code Coverage`
    - Updates `Test Coverage` tag

2. [Validate Protos](https://github.com/im-Amitto/lummo/actions/workflows/buf-breaking.yml)  
    Checks if there are any breaking changes in the raised PR. Useful to keep track of backward compatibility. ex: [PR#3](https://github.com/im-Amitto/lummo/pull/3/files)

## Metrics
Available at [/metrics](http://localhost:5000/metrics)  
1. `http_request_duration_ms` : Histogram -> Duration of HTTP requests in ms  
2. `http_response_status_code`: Counter -> Status code of response
3. `entries_in_db`: Counter -> Number of entries added in db
## License
[MIT licensed](LICENSE).
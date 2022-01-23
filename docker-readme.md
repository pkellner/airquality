# Docker Building Instructions

.env.production has values (tested ISDEBUGGIBG with single quotes) that are used when building locally and pushing to pkellner/...

Need to test with github actions

PURPLEAIR key comes from docker-compose file


## build and push docker image
After docker login from lastpass, this works:

- docker build -t pluralsight-first-look-react18-before .
- docker tag pluralsight-first-look-react18-before  pkellner/pluralsight-first-look-react18-before:1.3
- docker push pkellner/pluralsight-first-look-react18-before:1.3




## Misc stuff

docker tag pluralsight-first-look-react18-before  pkellner/pluralsight-first-look-react18-before:1.1

docker push pkellner/pluralsight-first-look-react18-before:1.1

docker run -p 1080:3000 pluralsight-firstlook-react18-before

docker pull pkellner/pluralsight-first-look-react18-before:latest

docker exec -it 05a /bin/sh



Browse to localhost:1080


## Notes

https://www.papertrail.com/solution/tips/how-to-live-tail-docker-logs/

- docker logs --follow <container ID>
- docker logs --tail 100 <container ID>
- docker logs --follow --until=30m

docker exec -it <container name> /bin/bash
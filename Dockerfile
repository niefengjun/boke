FROM registry.cn-hangzhou.aliyuncs.com/niefengjun/nodejs:4-slim
# MAINTAINER mac@niefengjun.cn

ENV HTTP_PORT 4000
COPY . ./app
WORKDIR /app

EXPOSE 4000

CMD ["node","www"]

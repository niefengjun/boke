FROM hub.c.163.com/public/nodejs:5.7.0
# MAINTAINER mac@niefengjun.cn

ENV HTTP_PORT 4000  //端口号

COPY app/ /app  //工作目录

npm install

# EXPOSE 4000

CMD ["node","www.js"]//启动项目
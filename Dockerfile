FROM arp.reg.innertoon.com/library/node:4-slim
# MAINTAINER mac@niefengjun.cn

ENV HTTP_PORT 4000

COPY . /



# EXPOSE 4000

CMD ["node","www.js"]
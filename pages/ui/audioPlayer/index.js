
import React, { useRef } from 'react'
import AudioPlayer from '@/components/audio_player/index copy0'
import userApi from "@/redux/api"
import Button from '@/components/button'
import TimeLine from '@/components/audio_player/TimeLine'
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@/components/icon'
import MicrophoneInput from '@/components/microphone_context'

const songData = {
  "NGC_4548": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXyenNjhTktcY28ttr8uqGj2b2Z7okvQQNnHYt2jDxFxr/0",
  "NGC_6864": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmWbqzwJrrMCqHmXKFSQTCsCgQZgGiTjKi41YuSTC6jjFF/0",
  "NGC_3351": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXE8X2SAvcxzrL6t7ShhiTRe6jCjcbSYGGtAVGbKJKpuh/0",
  "NGC_2287": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVZxy4o8MMfpho7oND2UMrvPGuRD4X2uXbRvBquwfQuRT/0",
  "NGC_2437": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcqiejRDDcj8T8fLnzC6czLALJqhQwPmEcw7HKzzjPfZb/0",
  "NGC_4621": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdh5moFb8HKQRtTtgBh5XzGbb92zxKkdziumzHPSMs46C/0",
  "NGC_4472": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmViaupmHQYwo4fpCeyjtYeAGL6dA3KQ5GxMtAQvHDB7Vq/0",
  "NGC_4254": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXwmnyjP3HQk1m8AGXUxsK9fQMQgTioogiu65hgciHvSA/0",
  "NGC_6523": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVgTktygvDXrWdfwA5dK3aSSM1m8kroCmXcc9KK1VKTeW/0",
  "NGC_6705": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdNxTmLnZ3bNPXGJhTAjvUFAwE1HciidByvRn7enqQKyW/0",
  "NGC_6494": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdako8Y1LTt1z1e13pmDMypMgxuKM1xZ7HAnFaTQ6kih1/0",
  "NGC_129": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRZUpBXYGzLfNiPEX9j7gQPDfRUYad9oEYgX1QAAdG79g/0",
  "NGC_6715": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmU2bwNwg7AmuKLPsNbn4qmf3V8RiABLFyatyFX6zM8y85/0",
  "NGC_6266": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQa2jEWPs2vzipKooeSGeYue1a4pjp9s1DArNA4E5iYU3/0",
  "NGC_4826": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRqks7KCdctZh4sB8arVGxdLJg86TDAZU1KFvhctGWdRq/0",
  "NGC_2682": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUf9o1xLtY7SMbhqUiZ6pSsY7xhYfe3ZRWSkZWppUmskd/0",
  "NGC_6838": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdiiUyMGuHDLxVUpADhz77J57gMwDqMM63tmdDXQQNnWS/0",
  "NGC_4192": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPoUD5KCogPpDwM9Gs5D2PYFfQBKJL9tz732a7KQyRDJU/0",
  "NGC_5866": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbVRbvTH33FSHK9gvhJ78qdgdhUSFtRDjZUNnG7QqtE6d/0",
  "NGC_581": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmY2N3dxtB9u45JSKKKdSm6SMosKNqgk9pQ7x1XQLhDcBK/0",
  "NGC_4258": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX4XcDiicggThr95bn8TPssTL4NTsk2Mu3oMUyTafozNY/0",
  "NGC_6681": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeTke3GC6cppC5qeDSCSbVkzQFBakxMNB7fxJ7CxLJejg/0",
  "NGC_2323": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX2VafgMBtKS1bkbV3SphJwSkdF1MFaMMdseT8pZDCqrv/0",
  "NGC_4303": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTEmLZ6vYdTXvYzVbtgpSEvXGa22BQQwwg32o3x3nVznm/0",
  "Winnecke_4": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeyXXz7CqRDr9YDboaYqNYfYbbZSsY4eVxTuArpZnTFky/0",
  "NGC_4736": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeEYqVaFAusAjf8fEfv2A4EoqUE1fiPxiWwaWvvgcn5P1/0",
  "NGC_3587": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPVScL2UuprtRavMhhoH8fQ3ZBdQED3xi7GYFHkiUvrcV/0",
  "NGC_3031": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmY131KKq2XxgmmDKN5J44hqwR6jaJGj3ksmq37gwctrbj/0",
  "NGC_6341": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTCegdVDn4ZevK7gwf56bpVEkrMfpQaYwUveV4hwdLF3t/0",
  "NGC_4560": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTi1aDEiaLSrCv48EPa5oVHNGXZJi5v4YBLpzR4waVSMq/0",
  "NGC_4486": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcqfXTgGhAdny2DSL5wsfPPpLxiAmVcREZpacJFGAU6Zm/0",
  "NGC_7089": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUkoM5LZAAhVZi2J5BouoLbH1Knm2eAfA4TboBf2J5Es2/0",
  "NGC_6504": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSVmYxVMEzD56qipLmRGhdW4w6ULChKN8Dm56kfd8XcNM/0",
  "NGC_6618": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNRN9XGPunmjJxNgSwH96ZyJjHmML3mw5CPpk2zrZYi7d/0",
  "NGC_6853": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmam3aXr3mzejHjm9xcVmGAYHX5LqBVNJCyTqVy5kN1eKz/0",
  "NGC_6626": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmesE1fQ5cJiBbdnRTCuKB4rBqfmYMSgfDi4v9gHDby6UQ/0",
  "NGC_5457": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPSCbScYuS324VagRyehtZUEjhxh5EaVoyrxfQaw5gXo2/0",
  "NGC_1039": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbWpMy4EuveMGdXN6iM3TjdV6YhYQhQixntNTZDoUv73H/0",
  "NGC_6779": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmd6SHwHxFQroEtxKT2tBZD4nZ4T3v1TSTDLYy4G2pVbNk/0",
  "NGC_3992": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmWULfvbB2RB8Jb6NckztsrVGDpuJKBX1haePNPGQYYCYN/0",
  "NGC_205": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZ2YGJ8gtrUhxmCLJGayDADTrnkkBrgi1vcyDRNAedrMf/0",
  "NGC_6333": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUwB7VNvTGeLgJuHiM1jLZJz6JLLBCDi1nRxhnGcNfqnd/0",
  "NGC_1952": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZDA3DMKCecpjQT1PrxumSbEakcCJ4a51rrJ7iBKV5t9B/0",
  "NGC_6656": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX2CV4v8PDNraZSFxbEhgxJyzeXXMMuUKBoPvZ2iB8TzD/0",
  "NGC_7099": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZp8p7RsCzfMw3EkL41JwpxvEy7ozMH5gZPPkDw4ZLrFj/0",
  "NGC_6218": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSxncGaJGHNVjcAKjdCEYvmPQgYDZEccR2qkBtaC8MFLE/0",
  "NGC_6205": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfDg8khy6SXKTLWWRX77Pb8aAsaUbC3rgvNxG53XLYShB/0",
  "NGC_6273": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbgkkCMa7dcW59NhcTkhTUZbfsB7on5cnGwwtZ4suxoi9/0",
  "NGC_6694": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcSNbpUeucsj4AMYpPGANhNshuM6sk2ewnX6LyrcPAvXN/0",
  "NGC_221": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVvb2VukPWWcHupvgUQPo6MzCWpzFfQgFmLJex41k98ir/0",
  "NGC_1912": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSuTMa8xFjrQYsCw2EXSzR6NMnJpRSGeSfau6zw1bpe4G/0",
  "NGC_9176": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmaZpNUS8at91448kpEZgTCdwg7pUp4ooouTn1Pzj7osbP/0",
  "NGC_1982": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPWHZWUYgEtXTj5nqfhTkKg25XXKQTqJYxfFQQLqq7jNE/0",
  "NGC_1432": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQCBgMCF9iL5GFWUT3YsSiNNidAatRac62jYZ6sKuKHJS/0",
  "NGC_7654": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRqhgSC1PzjrY9N4FK17LsSoGj1nHR6HykCpNuKk2dGn9/0",
  "NGC_5024": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmd19YV8nxoF9NqhjBpUKFVVNxayw7cb7vDjikDipkSNDq/0",
  "NGC_6809": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZyZ1mRTaNyCYpDcEw8h2wANj4WVEDwhPTnqnSwj7nq7T/0",
  "NGC_4579": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfQLNeVWuLYDJEXXLhVBgYpWEzxmQqkhLEucdVE3D55UV/0",
  "NGC_4649": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXUgqv2ZvTyQFTxUYcAmwovf1DWBRZDrQdKYaXNZKmaM2/0",
  "NGC_4590": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVwSGMv7AajZWMBGAdhJMqycGqKCpKzWAxUNwXQS4DA5n/0",
  "NGC_5236": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbEGnJSVvYmL2Qf2qXqTsuk8fncQdFSwMbrWrv9ETPJxw/0",
  "NGC_4406": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNrh7ZF9MPCND5xv3AyhUgMV7sS3kLbmMpZZaWekKM1xj/0",
  "NGC_2422": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZy7gj3JD1SwLU9LzmXaZWRuJdEMWH54S6vDyYAYRT8CR/0",
  "NGC_3623": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQxchKA5J6e1udeTomqAsdkewgq4buC2ezrCAjGv7xk88/0",
  "NGC_1904": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPvHA7hEaXLZcdNxatsE39v2Shj3bTxt7tkA8wtCLgr8P/0",
  "NGC_4374": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRr2gR6zfErJiWx5wpVgWLn1pkDMxmePcBsWGJy1ZctGw/0",
  "NGC_6514": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYBi6MbBEuS7hYJUHoGYqgkmV7Znt95sZF8GiUQEwktxA/0",
  "NGC_6254": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQssWpkUJbLTe7B9UKrQcFVffSBtz6vrxPEVFtKNMTLii/0",
  "NGC_6402": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmax1UuFptrLnsFdDtZBC572PUVKogVf59vu7BxESyE3q5/0",
  "NGC_6603": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcUYnr9BE2asq3LR75LqbpABCV4hSBvfxq8mcJoQQDCbE/0",
  "NGC_598": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfF6YjPcoPzpvi9juye3yxSR3MSkutPTJ4m9cAe6SyKSX/0",
  "NGC_4382": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdmWE4Q4bKFkF6t3YHf8ef8JvYKtn2Re19hQDeuNtfrgJ/0",
  "NGC_5055": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUa34tPZgKxaYKSYGGJzDxpWBeRZr83pFqZFopdtu22rK/0",
  "NGC_650": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX7FJtMD5nUy2wwg5auJp4WsRALZzUgzvVp5YJqMPb6pz/0",
  "NGC_6093": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeTBE4pdtNqfLYgBWx34kaCJBvFWNLMwrjgPPW82M1stM/0",
  "NGC_2447": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSVRm4FsBKPFRRdchhTnXCEtR8DmptrF1zRmsZMDuH6fJ/0",
  "NGC_628": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTqJijDEyLsd5yLHD9R36NsD4i5tve1rvXNknRfN4jFPT/0",
  "NGC_4552": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZMU9A6Q8pPXvPxwuXuwT1MsjyJJwccJGboFS47UWupez/0",
  "NGC_2099": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfSkL5je9vCD2GfUaFgqPwJgXMjZVwP5F7SpYaRRvo4Kh/0",
  "NGC_1960": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRz4ZxpTWbK9XRLayhGs6grmABwcGUtjDxFGQUBVSzatG/0",
  "NGC_2548": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUTMiM8Y7jFNeKip5AtBAT7hm8xJdmBefGaLHrhsptaWg/0",
  "NGC_224": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmW54sVDaJ6R8HPP6pHfRg5yiDYwCbLWdQRQ6NZqXTMdmA/0",
  "NGC_4594": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdNEhqHjJ3wMHtP7KPLgwGmiZ2kWh34GLCitvtwbnX9jb/0",
  "NGC_3379": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNyxxaSsWwsWJah7SjGEXdPvcaonztKwAFfsCVSNw7uUw/0",
  "NGC_3368": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbaitZSKeSZqJuUf4a2pswanmLxyAdFNQGqeQ1ouvmjZt/0",
  "NGC_6611": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdd6SkumDYhEckg2UJwZ7xWpzwNkmVJ42vPSfhWYcQ6Lg/0",
  "NGC_6121": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTu3pizbx7ykh4m5dyHy6yQULnyW8irdxoU9HpWfYXisC/0",
  "NGC_7078": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYHbknefdA19JPUqe8GrXC4KkVpgoLK3smhrHK2VUVVuU/0",
  "NGC_6613": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUXTkoQzF21BZVoKZm6SnP3nPuxVCA9dYYyPaDKoquPbi/0",
  "NGC_6531": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPSzJsBHTK5oQJeczeyLQtfg7nxSD6JbU94oUWUs3Yeav/0",
  "NGC_2168": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYhc7zTHPniZNidNvtQmz8TNDvpemjoukZsvvEiuk1a2Z/0",
  "NGC_5194": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmaDx656FugkAZEyhqdMs1DE2pxnmYi2oDdTb2eCZcBFYh/0",
  "NGC_6994": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPcTw65wo1ixbKhQ1UoB4vxVmrQqi2DN4SHDS6heHqkdJ/0",
  "NGC_1068": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeHwNy52cMgiqaMH1t3bzVD6qWHeMSQiz89KdkWiQzVG5/0",
  "NGC_2068": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRfTX5SyDdUzDCTFasZ6nCGQkxriSxhzGQiPf3RRdDLCy/0",
  "NGC_3034": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVpJmBJYAYjWGiZ72KcBa2dCATgdSQEvXX14NMTBjUjbz/0",
  "NGC_4501": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYHEzn1aMf3syxY3f8dPAu9LQt2QAu7krmG7JZMDk6v3s/0",
  "NGC_6637": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmT3PgZHMNKsrQo5x6WpKTx55Hfu3uEirgBJM5kbYSbXfp/0",
  "NGC_6720": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPxzga4oc7DViCqevJxi1xuJ9X8sjsahK1rTcccM6WkYM/0",
  "NGC_3627": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdHRpmZ8XqXPfYpcHiXxWLcgJ7J9L3K262zQB6sMJTacm/0",
  "NGC_2632": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPYP1CDZLAR5GcquW4CoJphVR7s4dG2SnTVDoPbjPwzqc/0",
  "NGC_4321": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmR4ckhWpwpHBr4YKNgaYrt5Y6AB3eBsEd36SYyPy1Ct5Y/0",
  "NGC_6981": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmT3VNfiZe9m2Ee4EZyL1PZZFaorwW84Hpn1WR4upZ6hBT/0",
  "NGC_5272": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYB9dJbFe7LHd8i3zj8WZHcWarUfuAHbhP63AvPX8LwP6/0",
  "NGC_6475": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmP4y2axgMVoofWZF3PdDY3o57cjmVXpRpCC9JAkSFpgMo/0",
  "NGC_5904": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdFXjjQvBMdybAwtZk6cddaQYszdtiPZc1HNuFAWPPUKe/0",
  "NGC_7092": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qma2XrZXpCZiB3DQD1ZSR7fkpxNiVE5iTuNbENo82otWFT/0",
  "NGC_6913": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVv8RLe2ny1aJzZxwaVKJeBfkazZeU7iYHi5iw6JsXqYd/0",
  "NGC_6171": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTGHGsMgqqQSfa8hxWRpjRt8ACsDvKe5q4ekAiGMx8788/0",
  "NGC_3556": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYPRpB9DEZZye6emSQyk8vobPuWhqKvM5tNxP1FPCKysz/0"
}

const AudioPlayerWrapper = () => {
  // const { currentTime, duration, connected, analyser, audioLink } = useSelector((state) => state.audioPlayer);

  // const audioRef = useRef(null)

  const createManyTracks = async () => {
    const response = await userApi.post("/track/createMany", songData);
    console.log(response)
  }





  return (
    <div className="ui-screen page-wrapper">
      <div className="page-container">
        <MicrophoneInput />
        {/* <Button
          label="Add Many Tracks"
          wrap={true}
          small={true}
          minimal={true}
          icon="plus"
          onClick={() => createManyTracks()}
        /> */}
        {/* <AudioPlayer audioRef={audioRef} link={tracksJson[0]} />
        <AudioPlayer audioRef={audioRef} link={tracksJson[1]} />
        <AudioPlayer audioRef={audioRef} link={tracksJson[2]} />
        <audio
          src={audioLink}
          ref={audioRef}
          crossOrigin="anonymous"
        />
      </div>
      <TimeLine audioRef={audioRef} /> */}

      </div>
    </div>
  )
}

export default AudioPlayerWrapper

// const songData = {
//   "NGC_4548": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXyenNjhTktcY28ttr8uqGj2b2Z7okvQQNnHYt2jDxFxr/0",
//   "NGC_6864": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmWbqzwJrrMCqHmXKFSQTCsCgQZgGiTjKi41YuSTC6jjFF/0",
//   "NGC_3351": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXE8X2SAvcxzrL6t7ShhiTRe6jCjcbSYGGtAVGbKJKpuh/0",
//   "NGC_2287": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVZxy4o8MMfpho7oND2UMrvPGuRD4X2uXbRvBquwfQuRT/0",
//   "NGC_2437": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcqiejRDDcj8T8fLnzC6czLALJqhQwPmEcw7HKzzjPfZb/0",
//   "NGC_4621": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdh5moFb8HKQRtTtgBh5XzGbb92zxKkdziumzHPSMs46C/0",
//   "NGC_4472": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmViaupmHQYwo4fpCeyjtYeAGL6dA3KQ5GxMtAQvHDB7Vq/0",
//   "NGC_4254": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXwmnyjP3HQk1m8AGXUxsK9fQMQgTioogiu65hgciHvSA/0",
//   "NGC_6523": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVgTktygvDXrWdfwA5dK3aSSM1m8kroCmXcc9KK1VKTeW/0",
//   "NGC_6705": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdNxTmLnZ3bNPXGJhTAjvUFAwE1HciidByvRn7enqQKyW/0",
//   "NGC_6494": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdako8Y1LTt1z1e13pmDMypMgxuKM1xZ7HAnFaTQ6kih1/0",
//   "NGC_129": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRZUpBXYGzLfNiPEX9j7gQPDfRUYad9oEYgX1QAAdG79g/0",
//   "NGC_6715": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmU2bwNwg7AmuKLPsNbn4qmf3V8RiABLFyatyFX6zM8y85/0",
//   "NGC_6266": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQa2jEWPs2vzipKooeSGeYue1a4pjp9s1DArNA4E5iYU3/0",
//   "NGC_4826": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRqks7KCdctZh4sB8arVGxdLJg86TDAZU1KFvhctGWdRq/0",
//   "NGC_2682": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUf9o1xLtY7SMbhqUiZ6pSsY7xhYfe3ZRWSkZWppUmskd/0",
//   "NGC_6838": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdiiUyMGuHDLxVUpADhz77J57gMwDqMM63tmdDXQQNnWS/0",
//   "NGC_4192": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPoUD5KCogPpDwM9Gs5D2PYFfQBKJL9tz732a7KQyRDJU/0",
//   "NGC_5866": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbVRbvTH33FSHK9gvhJ78qdgdhUSFtRDjZUNnG7QqtE6d/0",
//   "NGC_581": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmY2N3dxtB9u45JSKKKdSm6SMosKNqgk9pQ7x1XQLhDcBK/0",
//   "NGC_4258": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX4XcDiicggThr95bn8TPssTL4NTsk2Mu3oMUyTafozNY/0",
//   "NGC_6681": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeTke3GC6cppC5qeDSCSbVkzQFBakxMNB7fxJ7CxLJejg/0",
//   "NGC_2323": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX2VafgMBtKS1bkbV3SphJwSkdF1MFaMMdseT8pZDCqrv/0",
//   "NGC_4303": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTEmLZ6vYdTXvYzVbtgpSEvXGa22BQQwwg32o3x3nVznm/0",
//   "Winnecke_4": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeyXXz7CqRDr9YDboaYqNYfYbbZSsY4eVxTuArpZnTFky/0",
//   "NGC_4736": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeEYqVaFAusAjf8fEfv2A4EoqUE1fiPxiWwaWvvgcn5P1/0",
//   "NGC_3587": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPVScL2UuprtRavMhhoH8fQ3ZBdQED3xi7GYFHkiUvrcV/0",
//   "NGC_3031": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmY131KKq2XxgmmDKN5J44hqwR6jaJGj3ksmq37gwctrbj/0",
//   "NGC_6341": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTCegdVDn4ZevK7gwf56bpVEkrMfpQaYwUveV4hwdLF3t/0",
//   "NGC_4560": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTi1aDEiaLSrCv48EPa5oVHNGXZJi5v4YBLpzR4waVSMq/0",
//   "NGC_4486": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcqfXTgGhAdny2DSL5wsfPPpLxiAmVcREZpacJFGAU6Zm/0",
//   "NGC_7089": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUkoM5LZAAhVZi2J5BouoLbH1Knm2eAfA4TboBf2J5Es2/0",
//   "NGC_6504": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSVmYxVMEzD56qipLmRGhdW4w6ULChKN8Dm56kfd8XcNM/0",
//   "NGC_6618": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNRN9XGPunmjJxNgSwH96ZyJjHmML3mw5CPpk2zrZYi7d/0",
//   "NGC_6853": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmam3aXr3mzejHjm9xcVmGAYHX5LqBVNJCyTqVy5kN1eKz/0",
//   "NGC_6626": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmesE1fQ5cJiBbdnRTCuKB4rBqfmYMSgfDi4v9gHDby6UQ/0",
//   "NGC_5457": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPSCbScYuS324VagRyehtZUEjhxh5EaVoyrxfQaw5gXo2/0",
//   "NGC_1039": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbWpMy4EuveMGdXN6iM3TjdV6YhYQhQixntNTZDoUv73H/0",
//   "NGC_6779": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmd6SHwHxFQroEtxKT2tBZD4nZ4T3v1TSTDLYy4G2pVbNk/0",
//   "NGC_3992": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmWULfvbB2RB8Jb6NckztsrVGDpuJKBX1haePNPGQYYCYN/0",
//   "NGC_205": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZ2YGJ8gtrUhxmCLJGayDADTrnkkBrgi1vcyDRNAedrMf/0",
//   "NGC_6333": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUwB7VNvTGeLgJuHiM1jLZJz6JLLBCDi1nRxhnGcNfqnd/0",
//   "NGC_1952": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZDA3DMKCecpjQT1PrxumSbEakcCJ4a51rrJ7iBKV5t9B/0",
//   "NGC_6656": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX2CV4v8PDNraZSFxbEhgxJyzeXXMMuUKBoPvZ2iB8TzD/0",
//   "NGC_7099": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZp8p7RsCzfMw3EkL41JwpxvEy7ozMH5gZPPkDw4ZLrFj/0",
//   "NGC_6218": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSxncGaJGHNVjcAKjdCEYvmPQgYDZEccR2qkBtaC8MFLE/0",
//   "NGC_6205": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfDg8khy6SXKTLWWRX77Pb8aAsaUbC3rgvNxG53XLYShB/0",
//   "NGC_6273": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbgkkCMa7dcW59NhcTkhTUZbfsB7on5cnGwwtZ4suxoi9/0",
//   "NGC_6694": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcSNbpUeucsj4AMYpPGANhNshuM6sk2ewnX6LyrcPAvXN/0",
//   "NGC_221": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVvb2VukPWWcHupvgUQPo6MzCWpzFfQgFmLJex41k98ir/0",
//   "NGC_1912": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSuTMa8xFjrQYsCw2EXSzR6NMnJpRSGeSfau6zw1bpe4G/0",
//   "NGC_9176": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmaZpNUS8at91448kpEZgTCdwg7pUp4ooouTn1Pzj7osbP/0",
//   "NGC_1982": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPWHZWUYgEtXTj5nqfhTkKg25XXKQTqJYxfFQQLqq7jNE/0",
//   "NGC_1432": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQCBgMCF9iL5GFWUT3YsSiNNidAatRac62jYZ6sKuKHJS/0",
//   "NGC_7654": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRqhgSC1PzjrY9N4FK17LsSoGj1nHR6HykCpNuKk2dGn9/0",
//   "NGC_5024": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmd19YV8nxoF9NqhjBpUKFVVNxayw7cb7vDjikDipkSNDq/0",
//   "NGC_6809": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZyZ1mRTaNyCYpDcEw8h2wANj4WVEDwhPTnqnSwj7nq7T/0",
//   "NGC_4579": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfQLNeVWuLYDJEXXLhVBgYpWEzxmQqkhLEucdVE3D55UV/0",
//   "NGC_4649": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXUgqv2ZvTyQFTxUYcAmwovf1DWBRZDrQdKYaXNZKmaM2/0",
//   "NGC_4590": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVwSGMv7AajZWMBGAdhJMqycGqKCpKzWAxUNwXQS4DA5n/0",
//   "NGC_5236": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbEGnJSVvYmL2Qf2qXqTsuk8fncQdFSwMbrWrv9ETPJxw/0",
//   "NGC_4406": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNrh7ZF9MPCND5xv3AyhUgMV7sS3kLbmMpZZaWekKM1xj/0",
//   "NGC_2422": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZy7gj3JD1SwLU9LzmXaZWRuJdEMWH54S6vDyYAYRT8CR/0",
//   "NGC_3623": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQxchKA5J6e1udeTomqAsdkewgq4buC2ezrCAjGv7xk88/0",
//   "NGC_1904": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPvHA7hEaXLZcdNxatsE39v2Shj3bTxt7tkA8wtCLgr8P/0",
//   "NGC_4374": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRr2gR6zfErJiWx5wpVgWLn1pkDMxmePcBsWGJy1ZctGw/0",
//   "NGC_6514": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYBi6MbBEuS7hYJUHoGYqgkmV7Znt95sZF8GiUQEwktxA/0",
//   "NGC_6254": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmQssWpkUJbLTe7B9UKrQcFVffSBtz6vrxPEVFtKNMTLii/0",
//   "NGC_6402": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmax1UuFptrLnsFdDtZBC572PUVKogVf59vu7BxESyE3q5/0",
//   "NGC_6603": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmcUYnr9BE2asq3LR75LqbpABCV4hSBvfxq8mcJoQQDCbE/0",
//   "NGC_598": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfF6YjPcoPzpvi9juye3yxSR3MSkutPTJ4m9cAe6SyKSX/0",
//   "NGC_4382": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdmWE4Q4bKFkF6t3YHf8ef8JvYKtn2Re19hQDeuNtfrgJ/0",
//   "NGC_5055": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUa34tPZgKxaYKSYGGJzDxpWBeRZr83pFqZFopdtu22rK/0",
//   "NGC_650": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmX7FJtMD5nUy2wwg5auJp4WsRALZzUgzvVp5YJqMPb6pz/0",
//   "NGC_6093": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeTBE4pdtNqfLYgBWx34kaCJBvFWNLMwrjgPPW82M1stM/0",
//   "NGC_2447": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmSVRm4FsBKPFRRdchhTnXCEtR8DmptrF1zRmsZMDuH6fJ/0",
//   "NGC_628": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTqJijDEyLsd5yLHD9R36NsD4i5tve1rvXNknRfN4jFPT/0",
//   "NGC_4552": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmZMU9A6Q8pPXvPxwuXuwT1MsjyJJwccJGboFS47UWupez/0",
//   "NGC_2099": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmfSkL5je9vCD2GfUaFgqPwJgXMjZVwP5F7SpYaRRvo4Kh/0",
//   "NGC_1960": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRz4ZxpTWbK9XRLayhGs6grmABwcGUtjDxFGQUBVSzatG/0",
//   "NGC_2548": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUTMiM8Y7jFNeKip5AtBAT7hm8xJdmBefGaLHrhsptaWg/0",
//   "NGC_224": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmW54sVDaJ6R8HPP6pHfRg5yiDYwCbLWdQRQ6NZqXTMdmA/0",
//   "NGC_4594": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdNEhqHjJ3wMHtP7KPLgwGmiZ2kWh34GLCitvtwbnX9jb/0",
//   "NGC_3379": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmNyxxaSsWwsWJah7SjGEXdPvcaonztKwAFfsCVSNw7uUw/0",
//   "NGC_3368": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmbaitZSKeSZqJuUf4a2pswanmLxyAdFNQGqeQ1ouvmjZt/0",
//   "NGC_6611": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qmdd6SkumDYhEckg2UJwZ7xWpzwNkmVJ42vPSfhWYcQ6Lg/0",
//   "NGC_6121": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTu3pizbx7ykh4m5dyHy6yQULnyW8irdxoU9HpWfYXisC/0",
//   "NGC_7078": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYHbknefdA19JPUqe8GrXC4KkVpgoLK3smhrHK2VUVVuU/0",
//   "NGC_6613": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmUXTkoQzF21BZVoKZm6SnP3nPuxVCA9dYYyPaDKoquPbi/0",
//   "NGC_6531": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPSzJsBHTK5oQJeczeyLQtfg7nxSD6JbU94oUWUs3Yeav/0",
//   "NGC_2168": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYhc7zTHPniZNidNvtQmz8TNDvpemjoukZsvvEiuk1a2Z/0",
//   "NGC_5194": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmaDx656FugkAZEyhqdMs1DE2pxnmYi2oDdTb2eCZcBFYh/0",
//   "NGC_6994": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPcTw65wo1ixbKhQ1UoB4vxVmrQqi2DN4SHDS6heHqkdJ/0",
//   "NGC_1068": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmeHwNy52cMgiqaMH1t3bzVD6qWHeMSQiz89KdkWiQzVG5/0",
//   "NGC_2068": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmRfTX5SyDdUzDCTFasZ6nCGQkxriSxhzGQiPf3RRdDLCy/0",
//   "NGC_3034": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVpJmBJYAYjWGiZ72KcBa2dCATgdSQEvXX14NMTBjUjbz/0",
//   "NGC_4501": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYHEzn1aMf3syxY3f8dPAu9LQt2QAu7krmG7JZMDk6v3s/0",
//   "NGC_6637": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmT3PgZHMNKsrQo5x6WpKTx55Hfu3uEirgBJM5kbYSbXfp/0",
//   "NGC_6720": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPxzga4oc7DViCqevJxi1xuJ9X8sjsahK1rTcccM6WkYM/0",
//   "NGC_3627": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdHRpmZ8XqXPfYpcHiXxWLcgJ7J9L3K262zQB6sMJTacm/0",
//   "NGC_2632": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmPYP1CDZLAR5GcquW4CoJphVR7s4dG2SnTVDoPbjPwzqc/0",
//   "NGC_4321": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmR4ckhWpwpHBr4YKNgaYrt5Y6AB3eBsEd36SYyPy1Ct5Y/0",
//   "NGC_6981": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmT3VNfiZe9m2Ee4EZyL1PZZFaorwW84Hpn1WR4upZ6hBT/0",
//   "NGC_5272": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYB9dJbFe7LHd8i3zj8WZHcWarUfuAHbhP63AvPX8LwP6/0",
//   "NGC_6475": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmP4y2axgMVoofWZF3PdDY3o57cjmVXpRpCC9JAkSFpgMo/0",
//   "NGC_5904": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmdFXjjQvBMdybAwtZk6cddaQYszdtiPZc1HNuFAWPPUKe/0",
//   "NGC_7092": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/Qma2XrZXpCZiB3DQD1ZSR7fkpxNiVE5iTuNbENo82otWFT/0",
//   "NGC_6913": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmVv8RLe2ny1aJzZxwaVKJeBfkazZeU7iYHi5iw6JsXqYd/0",
//   "NGC_6171": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmTGHGsMgqqQSfa8hxWRpjRt8ACsDvKe5q4ekAiGMx8788/0",
//   "NGC_3556": "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmYPRpB9DEZZye6emSQyk8vobPuWhqKvM5tNxP1FPCKysz/0"
// }
// const createManyTracks = async () => {
//   const response = await userApi.post("/track/createMany", songData);
//   console.log(response)
// }


/* <div style={{ marginTop: 20 }}>
          <Button
            label="Add Many Tracks"
            wrap={true}
            small={true}
            minimal={true}
            icon="plus"
            onClick={() => createManyTracks()}
          />
        </div> */

// const tracksJson = [

//   { id: 2, uri: "https://bb554ba31d988dbbc880888db00d07be.ipfscdn.io/ipfs/QmXyenNjhTktcY28ttr8uqGj2b2Z7okvQQNnHYt2jDxFxr/0/" },
//   { id: 3, uri: "https://p.scdn.co/mp3-preview/f2e134559488a679f6e6177cc753c54314d3b5c5?cid=2c80efaa731345e5adc70453f81b892c" },
//   { id: 4, uri: "https://p.scdn.co/mp3-preview/14855c580cce9c934031c223ac452fbd091ef5d4?cid=2c80efaa731345e5adc70453f81b892c" },
// ]
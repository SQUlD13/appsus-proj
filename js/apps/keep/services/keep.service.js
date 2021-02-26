import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

import { eventBus } from '../../../services/event-bus.service.js'

const KEEP_KEY = 'keeps'
const DEMO_IMG = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQExIWFRUVFhcXGBYYFRcXFxUWFxYXFhgZGBcYHSggGBolHRUXIjEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGi0mICUtKy0rLSstLS01Ky0tLS0tLS0vLS0tLS0tLS8tLi0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYCBwj/xABGEAACAQIEAwUECAMFBQkAAAABAgADEQQSITEFQVETImFxgQYykbEHFCNCUmKh0RUzcjWiwcLwc4KS0uE0Q0RTk7PD4vH/xAAZAQACAwEAAAAAAAAAAAAAAAAABAECAwX/xAAwEQACAgEEAAQEBQQDAAAAAAAAAQIDEQQSITETQVFhInGB8BQyUrHBM5HR4QVCof/aAAwDAQACEQMRAD8Az0IQnUHghCEACEIQAI0+GQ6lQfSOwgDWRj6nT/AvwjFbhaHbunw2+EnExs4hB95fiIFXGPmZ7FYc0zlPoesZlnxfEIwAU3IPLpKyQJTSUsIIQhAqLeEScu4GpNpGQJ3C+HtXfIDlUas3QcgPzHW3kT4FvH0BTqvTFyFawvvYgEX9DL/gOIoU6YXtqedu8wFRCcx5b8gAPSZvF45Ktaoyk6sdCLNpYaj0iNN8rLn6eQxZWoVr1OI/XwjotN2GlQFl3uLW0bTQkEH49I7wnA9tUCkdwWL+XJf961vIGXftEwqYZalrWqKR4qxKA+oYGXt1O22MF9SIU5g5P6GYhCEcMAhFtCACQhCABCEIAEIQgAt4kIQAIQhAAhCEANTTcMLg3E6mZo12TVTb/XSWWF4oxIUpc/l/YyRuNyfZaQiKfC0WBsEIQgASDju2+5a3hv8ArJ0IESWVgzVWnU+8G9QY0RNVGq7oB3rW8ZGDB0e5mYR/GMhYlBYf62jMBdrDEhFiQIAm2plHjqyMxKg+ZPyEmcXY2AvYfM/sJUxS+fO0skE7pIWYKouSQAOpJsJ1iKBQ5W3sCR0uAbHx1lx7L4FziUJXSm4zHkrG4Ueea2kWlLCyXjHLwbbBYDsaK0c13c2ZuZJBzG/gqm3kJ37RgLhnH9AH/qLaSHpntUO4s/x7tv0zTM+2/GcpWgtiQcz63Gxsvnrf4RKluVib+bOjbiFbX0K2LIeAxme4O41HlJc78ZKSyjkk/DGj2dTOH7Tu9mQRkGvezg6nTa0gmEJKQCQhCSAQhCABCEIAEIQgARYk6UwAMsJoaHHcMqqpwFFiFALF6gLECxJ13O8Jnul+kngzkdoV2Q3U2MahNCM4LKnxduag/pH14wvNT+hlNCGTRXTXmXf8XTo36fvI+J4pmFlBB63/AGlZFtDJLukySuPq/jP6Tv8AiNXr+gkRTJfEsYKpDCmlOyqtkFgcotmIv7x5yMsrvl6jb46ofvH00+Ujk31OsSEkq232Ek8PFPOva5hTzDPltmy88t9LyNFkMgdxQXM2S+W5y33y30vbnaMxYkOgGmwgYVqz+7RpjKOReocqk+R1t4CTfZ72dQ00r1QxLOpVAL3XbvDoSQT4Dxmg4bw1RhylZffOZ1N9Nso05iw06kz0HEez/wBV4ZUr1FtXrNh1ynelSOIpHJ4MQMzW5gDXKDOPZZvlLHXqOqtQSz2/I8OXh1TEV2q5SynEZTpewJJJPQAD9RPQKdBFvlUC7ZjYDVr3uepuBrOcJg0oqVQWBZmPiWN/2HkBH76eMRtt3vjpDtNOxZfbAkt3A2VjpmAvbqR42vbx6zFe3nBmpuKyU1FKwW63uD1qXOpJ+9z5677HDjW/SSOJYc1aTIr5CwtfKrDyKsLEGTTY4si+tTWDx/B1crA+fyl1hK+dQ3x8DKvi3DKmHfs6gsdwR7rDqD0jnB6neK9Rf4f/ALOzRZzjyZyZLHZawhJWBwqudXt4czHSqWXhEWEvBwmn+b4xG4SnIsPWBp4EikhLWpwc/db4iNHhL9V8rwK+FP0K+Efq4R13U/P5RmBRprsSEURSp6H4QA5hCEACEIQAIQhAAhCEACTsJiKapUV6WdmUBGzEdmQbk2GjXGljIMWQ1kAaJCEkAhCEACEIQAUAnQAkkgAAEkk6AADUknlNnS9iMRhaYxGLwxFyACWRxTzEBQwViVZiR3uRsLg74pmIF1JDDUEGxDDUEEbG9tZ6hwfjj0+Gfw+/bCoHDYh6pbuVDfuJl0NjpdtCb3O0S1ksR2t4NqE92Usll9H/AAwPjKee7rRpvUu2v2gKJTJ6kB3IvzUHcXmg+kzidPJTwga9QuKjKNctMK9i/S7ZbDc2JGimY/gvHKmFav2a9+rTpKlQgFadmqmobfebVLDbmdrGGRubkliWZibszHdmJ1J8TOY7FGvC7Y4qnK3c+kQ67veyoDpuzZR5CwJv6c412zXCuuUtsQ2ZSbXsDYG9gTqORmh9luDJjzUVMbRSomb7HJ2tQBWyZ3GdbLm+6LmxU3F7SFxPAVKFV6FS2emQLr7rggFWF9RcHY7G41tc4OqUY5aGI3RlLCZDpiwkhG0gVsIxTqnO6k8lYeRzD5rK7eC7fJW+1+FV8M7MpYoMy23U9fK2/gJ5nh6xQ5h0P6ieyM88s9pcNSSu3YsCpJ7ov3GGjL5X2/6RzSz8hHVw/wCxaYfDP9XpYhgMtTOAbg3KGzXA1G436xuROC3NMgAnvH5CT+xb8J+BnarbcU2ItEihxF1AAsQOsl0uMD7y+o/aVRQ9D8IkuXVk0aLD4xHIVTck2AsbknlHVqqdiD6zMAwvAur35o1UZrYVH95fXYzPriHGzN8THEx9QfePrrDJbx4vtF7Qw6oLKLTuowAuSLeO0pP4pU6j4Rivi3fRm06bCST48UuESuJNROq+94DT1ldCEgXlLc8hCEIFQhCKBABIRSIkACEIQAIRYkACEIQAIQhAB7BYU1XWmOepPRR7x/w8yJs6NRQ60QpsFNrDurlCd0nrZ106EXtcXi+xHB6lUqtIDtcRfKSCRTpKdajAH3Re/K5ZFuLiaj2moU6OIGFpaphqSU9bZjVe9aq7WFizZ6ZNuYnH1ct8m/JcIe0/w4Xm+/kVjicXjoMbKzmyH4kbgvEPqdapiKIalWqrlf7EVLi9+62Q7kAnKdbC4uI59ZeqzVahcu7XZ3tmfQC5A90WAAFhYDYTsmAEu5trBRVqLyjq5jB/m+aD+6x/5o/IwcCqxOgCoPV2YW/RfjBEskETz/25wlJKuZWs7C7JY8798G1tbajrPQTKD2s4N9Yp5lH2iXK/mHNf28fOXpltlyZ3w3Q4Mj7LYgislPl3z6lP/oJtp53wmt2dZXP3Sd/EFf8AGa6nxck2yfAzu6d/CI12JLDLaJlHSCG4uRbw6RYwMCZB0HwjdXDI26iOwgGEVGO4aAAUBJJ23kKphHXdT/rymkhAxlTFmVtCanKOkCo6QKfh/cysJpKuDptuo9NPlKnE8NYMQgJHXSQUlTKJBhJBwVT8BhAz2y9CPJvC8UtKoHamtUC90e+VrgjWxvpe/pIUJDWSDuodZxCEkAixIQAdLDKBl1ubtc6jSwtsLa/GNQhAAhCEACd0qWdgl7AnU/hUAlj6KCfScTb/AEQcA+tY01HW9LDhWboXJuifFQ3ktjo0ytltiyY9nrP0f+z/ANWodo6Za1YAlTvSpj+XS8LA3P5mOpAE854niTUr16h+9XreqrUZE/uKs9qxuIFKm9U7IjOfJVLH5TwjCKQi5jdsozHq1tT8bzkah4ikO6VbptscvFiWgYgdEZoVsyhrW3BHQg2I9CDHhIGJvTPaLrmIBTm7bAp+aw1vpYakWvJCV3/8lx/U1MD1ysT+k0x5me7yZIquqqWY2AFz4ASDSplsoIszv2rA7qiWyA+NwmnXP0kevVZnANqjA3FNT3EI2LtzI31HiFuLyxw1LKCSbs2rNtfoAOSjkPPckkzlIrhsdMrON4D6xSakDYmxU/mGov4S0Y/rIz0r3B2IIPrpKp4eS7WU0zydaLCqEYEMHAIO972noi4ZBsi/CYHiGDfDVih3QgqbaML3U+U3uDqFqaM25VSfMgEzvaV5yc2pctMehCEbNwhCEACEIQAIQhAAhCEACEIQAykIQkHOCEIQAIQhAAiiJFgBNqYG1Fa2dDmZlyBvtFygG7LyU30MhRc05kIBKjWBIF7Am3WfS3sdgcJgsIlKky2yLUepp9qzqCXJG9xa3QWA0nzRUJsbb2NvPlPecRw4UsC+HpJ7uHdFVRqTkI0A3Ym56kmL6jyGKKt+fYc9vPbShS4XVer3XxVOpTo0gbuwqKQrMDbL3GVm/CTbU2v5Xw3iwroa9MsMrWemxBFri9tNNDcW6WkT6bC/15Ab5BRXJ0tmbNbxv8hJvs7w9KGFGYWzKHqZtLG19b7ACc3UYwjelOM3FdFnXxCoLswUdSbD4mQuJ8XSkLDvuRcKDy5Enkvz5R9sbbvFSqcib5mO4yoBmPPex02mNxNVXd6iLlVzcC1uQFyORNr+sz0umVkvi6RtqL3CPwl/7NYh6tWq7nMQqW00UEvcKOQNh52F5obcpmfY8/aVf6U/Qv8AvNRaV1cVG1pe37E6Zt1psVKChbKABysNv2iU1AOsW1ooAi2TcWqLC8g1KhzW8ZPqA2kbsuZ3vJZCKP2q4OMRSzAfaU7lT1HNf28fMx1LWFtrC3lLR20lNhaLqgsuZRdRlPeAQldVO9rciT4Tp/8AH2pZjIXuUYvd6j0JzTqBhcG/LyI3BHI+E6nXKBCEIAEIQgAQhCABCEIAEIQgBlIQhKnOAmKBJmGemi3LDMfW3hJS4tKFYVqa06gIPcdcygkEG6nzuJTxOcInBUkRJ05nM0ICEIQAIQhABHvY235efKfQnC8emIpJXpm61FuD0PMHoQbgjkQZ8+SfwzjOJw1+wrvTBNyBYqT1yOCt/G15jbW5dDGnu8NvPTPVfb1FyUKjhbLVN2IFlvSc3ufdHd362mPFTtHUsDl3RLamx/muDsB90Hz3sFqMR7V4iqqitesVIN3cKmYbN2VOmoJB2uSRyMp6+Id2ZmdiW94BmCkchlBtYdIi9LOyWehieqj5F/7QcXWxoobswIYjZAdxf8RGluW/S+bgBbQR7DYbtDYnKoK526KTrbxyqx/3TG6qo0QE7LHZLLLT2VJFRjY2Kmx5Eqy3sedswmrBlXhKAV6bZcuYMir+BMudV8DZLnxJ6CWlrTj6t5tbOjpf6Z0TOC06ERhFhgO0jLvedMI1AMHFRhI3CqOrve4LME8Be7n1fNrzAWLiLkimuhbn0XTM3pf4kSdTQKAoFgAAB0A0Ec0sXzIS1k1xEg1sJnqOysVYZR1UmxPeXnoRqLHQayNVcobVBlvsb9xvJuvgbHzllhNc7dXb+7an/kjzqCCCAQRqDqCPER+FsoisbHEqoXlRxWktM5qDN2bbgBii36PbLl5WvoSOW1YDHYTUllF3f7GqiFgNyPjM0uJcbO3xMbY31OsuD1HsaR8Ug3cfGcfxCl+MfrM7CQV/EP0NQlZTswPqJ3MpFzHrJJWo9jVQmWzHqfjCBP4j2EKkaHcaHnqN9RvEt8x84qIToBfwEn8OwN3HaqypzICkjfYEjwmU5qMeRddllxDA4JKNNqVbPWYpnTLYKCLtrbcHTeHH8PQWjTam+ZzbOMtsh00BtruZ3isJQXs2odq25bOEFtNLBT4y5xHAKRoPiKddKgTLmXsyCCxA1v5/pOfGyMNrcn36f+df2NO+jAwinc+cSdNGQQhCSAQigXNpKw2BLtlzcuQvKSml2BEhJuP4eaQBJvc7WtykKWUk1lAEIQkgE0nCeHjJSBve/bsPEgrTU+Fr6dVPWZ6jRzstP8bBT5E2J9Bc+k22B1U1PxnMP6bWTy7oBt1Jiuol0iULjDYK/wCB1Y+APdY+isxk0iV3FiOxcG9mGU2vezkLpbnrO+HY9QMruLrZRUPuuCAVObYMQVuNNTpOdqKZSW9Lrsd0tsYvaydk6zgR+o+nhIyA6xBj6OiI0YlfFIndLC/4Rqx8lGsrMa7VsqAZFZyjC/fKgEtcroosNgdcw1Gx2q087OUuPUysvhX2+fQm4MZr1fxaL/QNj6m58ivSSSbamAEjcS/lOAbFhkB8X7g/Vp0IxUVhHMlJyeWLw6/ZISLEqGI8W7x/Umc5e1JvrTBItycjQk9VG1uZvytHMWxC5VNixCqel9yPJQT6RymgUBQLAAADoBoJJUKlMMCpFwRYjqDoRMJiKJpu1M6lGIv1G4PqCD6zezLe1FG1VX/Gv6obH9GX4TaiWJYIZTwhCOlQhCEACEI4lFjyt5/tIbwQNwkkYXxPwESV3ojcifV4a1Ih0YMttdiRfqP8ZOqcIxoQ1TRqKijMWKgADrrykfOPyH1/6SypY/i1bDuiVFbDUkyuB2QtTA2IPe25+ERvcuGmvfJMMPsh4WjWKKyq5Ww1yEj4gS84QW+qYzNuOxG1vvnlNb9HbkYGn3nGrbJmHvdbSn4htxM3v9pR3FufTlEJXuc3DHTX7o3VeEpZPOBwuudRSYg6g23E4q8OrKCzU2AG5I0E3HDcVTFP7UdkcgCB2ILMFFiNNQb3A8ZT401+xr9qrBSAUutgRm5dRtHq9bKUtuPT6/Lkq4YMrCE0nBuFLUoGp3O5a91uTmYjfwjttqrWWZpZIPsioOOwoIBBrJcHUHXpNzxRAONYcAAC2H0At+GZ9+HLQrsoy5qYBDKLWOhBB3B1l/xL+2cN/Thv8s51s989y/Syy9Ct+lr+fT/2afJpg5vPpZB7enp/3afJpiFoMeXxjekklTEiT5GooF9BrJdPBjmb+G0kKoGgFprK30KOQ1w3Bu1Sw0OSoRrzy5PT+ZNXQxKsclirAe4dGA+RHiLiVXAheo56IP7zH/kkmovaVHygN3VUOT3UZS9ypU3LDPbS2xBIis5NvLLx6H+KVLKul++DbrkVqn+SNNTVs4pvluDmsLpcjUnkG56EHmZ3iaGY0kYlrBmJ2LZVC3OW2+fbbWc0b06YTJexKKo2IBIW/IDKASTH9Gvg5MLnycvhGBW1OlYG5ysUzd0ixXKeZB3O05+rnMT2INwAAXFha+trHr05CGGWwYVGuUFiSdBTI0I9AQWOpKnyhhCQwNS92FqZP4d8p/PoCetvymMbIPy/b/Bnul6jdGkwWmL00ykL3Bnu1ih1sNdSdQZIwOFUVHfUkWXMTckkKzHoBbsxYAe6Ylajeoag7uQaE7MSNSR4KbBhqLt5R/CBhSBy3cguVvbvN3sua3K9r25RbVvbHb98GtXLySpHxf3B1qD+6GcfqojVGo9S4LhCN0C99fV9CPELY8jH6eFUHNqzDmzE20toDouh5ATnDAja1APwqW9WOVT8A/xj8j0NalQ9Mq/Bc/8A8kkQAJS+1dO9NG/C+vkVI+eWXUjcQwnaoKeneenvt/MXe3K0mLw8gYeE3/tF7DnB0xUfsmzNlstyb2JvqPCQ/aT2dWjh6dfs0Aqnu5Sb2B1uOUYjq4SxjzMm2n0Y0a7ax1MOeenzkkDppFtNXNshyOKdIDYevOdk2hBBfX4fvM28GVk9qyJlbwHpCOQlMsU8afqei+xHszhcThu0q9rmzsvczWsALbKes7xXDqeG/iNGkamUYZCLjW5Vyc3d2lv9F7WwXvOPtX0VLjZeeUyk9tOJLTr4ul2pFStToIqsoBddQ+hXSwO85U5TlZKOeP8AaOxBJJMX2J9pMJQwlOlVxa0nBYlDbQE3G6mR62JSrS4jVpuHRqlIq42YXGszHEfZYUagWrZiyMRZj905fDpLjEpRweHAbOlGs2XQlgzLr1uLWMuqa2/EhL8z/nPH9iHZJfC10V+JrYWstJnqOuVQqZU3qKqAg32F+ck8a4jSrUGRCSaaBXupGuYDQ312MXG16OCz0BmSoUz5TrcMdNTcayjxHHatRGpuARYKlgBlGa+th3uUFT8cZLlLrn/X8k7splV2C9P1Mu+GUcMcO4qZe10FIX+0N2ObIOZtIC4Ntb2201Oh67Sfw/B3psxpAtTItV7TL2JZtD2Z/mAx26acezNJocweGFMsipUQBT3aoAqC5v3guk0vEf7Zw39OG+SykrK4rVA9VazW1qKFUNtsFJA6eku+I/2zhv6cN/lmEnnD9mEe39CJ9J//AGmn/sk/zTIAzde3eGFTForXt2KHS/iOXnKT+DU+jc/xfvLVWKNaT9CZVuTyUUJY8VwKU1UrfU879D18pDwtHO6pe2Y2va9tCdpupJrJk4NPA9wunmJGtmdVaxtcLTd7HwuR5y/UACwFgOXSVeFwvZsFvf7c62t/4cj/AAlrM28mqWEVfFGGcNbMaaghbAls7bL+Y9np4+F53hQSC9yc2qjMSADqNTpfy0G3iTu9pVqFfcyoDcclBsLmwN3IvpEuVUgBlLMbA5SRfVsoBsdmNupPKdbTRxWmK2PMgwrhibFm7tmJCd3opsvvb6a257i61KuW6lmZjbJfLdj+Wy7jne9hr1nNBQh7typ94WJIewNza+pB19D1i1KV71CWvslkbNT8QLXuTvyIsPPdZx7lOMhjKLZchuwcqhObUXIB0AGlr7fC21lIFJy70wRqAznQgXAybHX75PpJ85mslmzCGaViI3Woq1rjUbEGxHkRqJxhHJzAnMFYqGsATYC97aXDXGlttp1i6pVSRq2gUdWY2X0uR6TqhSyqFGthvzJ5k+JOsVNRvCffPWo392yf5Y/I+A90/wBdX/3XkiABGMexFJyNSEYjzAJHyj84rrdWHUEfEQA130lFTh6ZU09aoPcSxsVbnfaYfj3Fq1aiuHbC9mtI9yrZh2wLb3IANrciZZ8c9rBiuGYY1KlM18/eopoUChlBNySBa3xldhfa3tGo0sZSD4aiTZaYIexHMlhfW21tpjRCUYdZw39oynOO7szvYP8AhP6fvBqLBSxWwBte4336zaY/2g4VlIoYF2brUdkUfBiTMc7k7m+t7cr+UZhbKXax8zGy2EOE8sjgX8vn/wBI5FMVRNGxGc3J5YloTu0JBTJ6x9GWIVcHY1GX7RtAAeS9VMznt7gqVXEV62ZmqU1oCmdgc91a4A6WhCcx8XSa++Ud5cxRSM9uzw7G9bD0np1tz3y2YWY+9oRrKz2gwOMrVWUBmpBropdco0GYhS2nOLCbOx11Rkl3zz78ldu6bRce1FbDYqpT7A3YLZjlIY6KACXGouGlJ/DbMAWPvDp1EIQrj4aUEaZ3clmMF+Y/AftFNTsg1O7N24FPKfdZgQy5rWsLBtdd4Ql/zcMGsIVsGaNV6RpJSKj3EYsi3sdGbU73l7xH+2cN/ThvksISie5Jv9L/AIMl2xr6RMaKOKRyub7FABrv3unlMU3Ha12PdF+VjZbfh1+d4Qk1r4F8jC6ySlhM7XjOcBaqEgG91OU/DXqZZUKlBWDqtS4PNlI6chEhMvFl0dJUx4JFGoGUONjWNv8AjNOWMIRpdCz7KSkpA+skWS5Yr4FiRUP5gDoN8o62AnYxSw7MaE65vwgEaj817W/0CQncrilFL2QhJ5efmcYJhkK2sU0a2xNgxPjcMD116xjBHvDN7ti1IdF2N/zWYW8GtvcwhJz19+YEvCr9rUNzbKgseR7xNvD3ZMhCcnUf1ZfMbr/KiM4zVQOVMZv95rqvwAf/AIh0kmEJiXGMF7g82PxYmPwhAAjeINkY/lPyMWEAMdSGg8h8o4qQhGGzkzm0OKLQMWEqYiERVEIQIOoQhAg//9k='
const DEMO_GIFS = [
    'https://media1.giphy.com/media/xT3i1c7aHa8zqC7Rv2/giphy.gif?cid=ecf05e47g5j6pe8ga7n4ph9ilr22lbx3r9pw4td64bgc3w5w&rid=giphy.gif',
    'https://media1.giphy.com/media/l2JJBzwv06HNhcORi/giphy.gif?cid=ecf05e47fo5m1tgydi8uefdrig7tj1bg3ssh145pl9aigf6w&rid=giphy.gif'
]
const DEMO_VIDS = ['https://www.youtube.com/embed/_-0b6HhzNGs']

var gFilter = ''

function query() {
    return storageService.query(KEEP_KEY)
        .then((notes) => {
            _sortPinned(notes)
            return Promise.resolve(notes)
        })
}

function _sortPinned(notes) {
    notes.sort((noteA, noteB) => {
        if (noteA.pinned && !noteB.pinned) return -1
        if (noteB.pinned && !noteA.pinned) return 1
        else return 0
    })
}

function getNote(id) {
    return query()
        .then(notes => {
            return notes.find(note => note.id === id)
        })
}
function deleteNote(id) {
    console.log("🚀 ~ file: keep.service.js ~ line 29 ~ deleteNote ~ id", id)
    return storageService.remove(KEEP_KEY, id)
}
function updateNote(note) {
    return storageService.put(KEEP_KEY, note)
}
function addNote(note) {
    //if (!note.id) note.id = utilService.makeId()
    return storageService.post(KEEP_KEY, note)
}
function addEmptyText(id) {
    return storageService.get(KEEP_KEY, id)
        .then(note => {
            note.txt.push({ txt: ' ', id: utilService.makeId(), active: true, editing: false })
            return storageService.put(KEEP_KEY, note)
                .then(() => Promise.resolve(note))
        })
}
function deleteContentItem(noteId, contentId, type) {
    return storageService.get(KEEP_KEY, noteId)
        .then(note => {
            if ((note[type].length > 1 && type === 'txt') || type !== 'txt') {
                console.log('deleting content line')
                var contentIdx = note[type].findIndex(content => content.id === contentId)
                note[type].splice(contentIdx, 1)
                this.note = note
                return keepService.updateNote(note)
                    .then(() => Promise.resolve(note))
            } else {
                Promise.reject('Cannot delete the last line - please delete the note if you wish to do so')
            }
        })
}

function toggleNoteList(note) {
    const queryStr = '\n\n'
    if (note.isList) {
        var str = note.txt.map(text => {
            return text.txt
        }).join(queryStr)
        note.txt = [{
            txt: str, id: note.txt[0].id, active: true, editing: false
        }]
    } else {
        var arr = []
        var str = note.txt[0].txt
        while (str.indexOf(queryStr) > 0) {
            var idx = str.indexOf(queryStr)
            var start = str.slice(0, idx)
            str = str.slice(idx + 1)
            arr.push(start)
        }
        arr.push(str)
        var txt = arr.map(text => {
            return {
                txt: text,
                id: text.id,
                active: true,
                editing: false
            }
        })
        note.txt = txt
    }
    note.isList = !note.isList
    console.log('keep Service toggle note list - note - line 92', note)
    return Promise.resolve(note)
}

function toggleNotePin(id) {
    return getNote(id)
        .then(note => {
            note.pinned = !note.pinned
            updateNote(note)
            return Promise.resolve(note)
        })
}

export const keepService = {
    query,
    createNote,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    createNotes,
    addEmptyText,
    deleteContentItem,
    toggleNoteList,
    toggleNotePin,
}

function createNotes() {

    var notes = [
        addNote(createNote({ txt: ['Hello'] })),
        addNote(createNote({
            txt: ['You have so many different things placeholder text has to be able to do, and I don\'t believe Lorem Ipsum has the stamina.We are going to make placeholder text great again.Greater than ever before.Does everybody know that pig named Lorem Ipsum ? She\'s a disgusting pig, right? \nAll of the words in Lorem Ipsum have flirted with me - consciously or unconsciously. That\'s to be expected. Lorem Ipsum\'s father was with Lee Harvey Oswald prior to Oswald\'s being, you know, shot.', 'remember to bust some caps'], isList: true
        })),
        addNote(createNote({ img: [DEMO_GIFS[1]], txt: ['DO YOU LIKE HURTING OTHER PEOPLS'], vid: [DEMO_VIDS[0]], pinned: true })),
        addNote(createNote({ img: [DEMO_GIFS[0], DEMO_IMG] })),
    ]
    return Promise.all(notes).then(ans => {
        localStorage.setItem(KEEP_KEY, JSON.stringify(ans))
        return Promise.resolve(ans)
    })
}

function createNote({ txt = [''], img = [], vid = [], editing = [],
    isList = false, color = utilService.createRandomColor(),
    active = true, id, pinned = false }) {

    // var addNote = keepService.
    //     notes.push(addNote)
    var obj = {
        id: id,
        isList,
        color,
        pinned
    }

    var txtArr = _createTextObject(txt, active, editing)
    if (!txtArr.length) txtArr = [{ txt: ' ', id: utilService.makeId(), active, editing: false }]
    obj.txt = txtArr

    var imgArr = _mapImg(img)
    obj.img = imgArr

    var vidArr = _mapVid(vid)
    obj.vid = vidArr

    if (!id) {
        obj.id = utilService.makeId()
    }
    return obj
}

function _mapImg(imgArr) {
    var imgMap = []
    if (imgArr.length) {
        imgMap = imgArr.map((item, idx) => {
            //var currEdit = false
            // if (editing.includes(idx)) currEdit = true
            return {
                id: utilService.makeId(),
                url: item,
                //editing: currEdit
            }
        })
    }
    return imgMap
}

function _mapVid(vidArr) {
    var vidMap = []
    if (vidArr.length) {
        console.log('making map for vidArr', vidArr)
        vidMap = vidArr.map((item) => {
            return {
                id: utilService.makeId(),
                url: item,
            }
        })
        console.log("🚀 ~ file: keep.service.js ~ line 201 ~ vidMap=vidMap.map ~ vidMap", vidMap)

    }
    return vidMap
}

function _createTextObject(text, active = false, editing = []) {
    if (text) {
        if (!text.length) text = [text]
        var Arr = []
        text.forEach((line, idx) => {
            var currEdit = false
            if (editing.includes(idx)) currEdit = true
            var obj = {
                txt: line,
                id: utilService.makeId(),
                active: active,
                editing: currEdit,
            }
            Arr.push(obj)
        });
        return Arr
    }
    return []
}


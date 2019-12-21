import numpy as np
import itertools


def score(a,b):
    return sum(np.array(a)*np.array(b))

Normal_Point = [25,28,31,34,37,40,44,47,50,53,70,84]
Normal2_Point = [25,28,31,34,37,40,44,47,50,53]
Event_Point = [130,170,240,320]

#Grandあり
d = {}
for i in itertools.product(range(4),repeat=len(Normal_Point)):
    #25を2回やるなら50を1回すればよい
    if i[0] > 1: continue
    #25と28やるなら53を1回すればよい
    if i[0] > 0 and i[1] > 0: continue
    #25と34やるのと28と31をやるのは同じ
    if i[0] > 0 and i[3] > 0: continue
    #25と37、28と34は31を2回と同じ
    if i[0] > 0 and i[4] > 0: continue
    if i[1] > 0 and i[3] > 0: continue
    #25と40、28と37は31と34をやるのと同じ
    if i[0] > 0 and i[5] > 0: continue
    if i[1] > 0 and i[4] > 0: continue
    #44と53は47と50をやるのと同じ
    if i[7] > 0 and i[8] > 0: continue
    #47と53は50を2回やるのと同じ
    if i[7] > 0 and i[9] > 0: continue
    #28を3回やるなら84を1回すればよい
    if i[1] > 2: continue
    #31と53、34と50、37と47、40と44は全て84
    if i[2] > 0 and i[9] > 0: continue
    if i[3] > 0 and i[8] > 0: continue
    if i[4] > 0 and i[7] > 0: continue
    if i[5] > 0 and i[6] > 0: continue

    #93＋84=177pt以上を計算する必要がない
    if i[11] > int(177/Normal_Point[11]):continue
    if i[10] > int(177/Normal_Point[10]):continue
    if i[9] > int(177/Normal_Point[9]):continue
    if i[8] > int(177/Normal_Point[8]):continue
    
    print(i)
    s = score(Normal_Point,i)
    if s not in d:
        d[s] = i
    else:
        if sum(d[s]) > sum(i):
            d[s] = i

#Grandなし
d2 = {}
for i in itertools.product(range(4),repeat=len(Normal2_Point)):
    #25を2回やるなら50を1回すればよい
    if i[0] > 1: continue
    #25と28やるなら53を1回すればよい
    if i[0] > 0 and i[1] > 0: continue
    #25と34やるのと28と31をやるのは同じ
    if i[0] > 0 and i[3] > 0: continue
    #25と37、28と34は31を2回と同じ
    if i[0] > 0 and i[4] > 0: continue
    if i[1] > 0 and i[3] > 0: continue
    #25と40、28と37は31と34をやるのと同じ
    if i[0] > 0 and i[5] > 0: continue
    if i[1] > 0 and i[4] > 0: continue
    #44と53は47と50をやるのと同じ
    if i[7] > 0 and i[8] > 0: continue
    #47と53は50を2回やるのと同じ
    if i[7] > 0 and i[9] > 0: continue

    #130＋53=183pt以上を計算する必要がない
    if i[9] > int(183/Normal_Point[9]):continue
    if i[8] > int(183/Normal_Point[8]):continue


    print(i)
    s = score(Normal2_Point,i)
    if s not in d2:
        d2[s] = i
    else:
        if sum(d2[s]) > sum(i):
            d2[s] = i

#Event
dd = {}
for i in itertools.product(range(10),repeat=len(Event_Point)):
    s = score(Event_Point,i)
    if s not in dd:
        dd[s] = i
    else:
        if sum(dd[s]) > sum(i):
            dd[s] = i


f = open("d.txt","w")
for i in sorted(list(d)):
    if i > 93 + 84: break #1pt刻みで調整可能な93pt～93+84pt(Forte1回分)まで実現出来ることを保存すればよい
    f.write(str(i)+":"+ ",".join([str(j) for j in d[i]]) + "\n")
f.close()

f = open("dd.txt","w")
for i in sorted(list(dd)):
    if i > 93 + (84+320)*4: break
    f.write(str(i)+":"+ ",".join([str(j) for j in dd[i]]) +"\n" )
f.close()

f = open("d2.txt","w")
for i in sorted(list(d2)):
    if i > 130 + 53: break #1pt刻みで調整可能な130pt～130+53pt(Mas1回分)までが必要
    f.write(str(i)+":"+ ",".join([str(j) for j in d2[i]]) +",0,0\n" )
f.close()
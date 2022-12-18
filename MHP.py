""" This program is not meant to be the most efficient simulation, but the
    most clearly defined and inuitive in order to provide a clear explanation """

import random

stayCounter = 0
switchCounter = 0

#for one thousand iterations
for i in range(1000):
    #create three doors with nothing behind them
    doors = [False, False, False]
    #select door to put car behind
    car = random.randrange(0, 3)
    #put car behind chosen door
    doors[car] = True
    #player pick door
    choice = random.choice(doors)

    #if player's pick has the car behind it
    if (choice == True):
        #staying would win
        stayCounter += 1
    #otherwise
    else:
        #switching would win
        switchCounter += 1

print(f"Stay: {stayCounter}/1000")
print(f"Switch: {switchCounter}/1000")
input("Press any key to continue...")
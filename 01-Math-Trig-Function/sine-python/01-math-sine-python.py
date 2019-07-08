import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from pylab import rcParams
rcParams['figure.figsize'] = 16, 9

fig, ax = plt.subplots(1,1)
plt.axis('equal')

ax.set_xlim([0, 2*np.pi])
ax.set_ylim([-2.5, 2.5])

# sine function plot
x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

# x axis path
ax.plot(3*x - 3, 0*y, linewidth=1, color='#dddddd')
# y axis path
ax.plot(0*x, 2.5*y, linewidth=1, color='#dddddd')

# unit circle path
ax.plot(np.cos(x), np.sin(x), linewidth=1)
# sine path
ax.plot(x + 1, np.sin(x), linewidth=1)


# ------ anim -------
sineLine, = ax.plot([], [], linewidth=4)
sineDot, = ax.plot([], [], 'o', color='#ff0000')

circleLine, = ax.plot([], [],linewidth=4)
circleDot, = ax.plot([], [], 'o', color='black')

def sineAnim(i):
    # sine anim
    sineLine.set_data(x[:i] + 1,y[:i])
    sineDot.set_data(x[i] + 1, y[i])
    # circle anim
    circleLine.set_data(np.cos(x[:i]), np.sin(x[:i]))
    circleDot.set_data(np.cos(x[i]), np.sin(x[i]))

anim = animation.FuncAnimation(fig, sineAnim, frames=len(x), interval=50)
# -------------

anim.save('sine-py-effect.mp4', writer='ffmpeg')

# plt.show()
# HTML(anim.to_html5_video())
import { YogaContentData } from "./types";
import { hindiData } from "./hindiData";
import { gujaratiData } from "./gujaratiData";

export const yogaData: YogaContentData = {
  english: {
    title: "Yoga for Mind and Body Wellness",
    description:
      "Discover these powerful yoga poses to enhance your physical and mental well-being. Each pose offers unique benefits for your body and mind.",
    poses: [
      {
        name: "Child's Pose",
        sanskritName: "Balasana",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAABI1BMVEX////FxcWFhYX91LaIiIjs7OzJycnCwsLo6OgjHhuwsLD8/Pzzyq6Dg4NxcW+0tLQAAAB8fHz91Li9vb2rq6v/1bRzc3PGxMP41Lf29vbzzK2ssbXDx8ptbW3e3t7/2r3S0tKamprHua7xz7T/9OuSkpLhxKz83MDu0Ll/g4YbGBQjHxwlHhf/2rf//vpNQzuypJienp7XxLb+59bo2cq9p5box6mYkInNtqP46+GOiIKDf3ulmZD5zqr58et5fYH/zaSXiHxXUEpiYF/vy7RANS01MzLgupwZGhrWvKetlIA4Kh8dFBKIeWw/PjxwXlFfTkCUe2e4mX9tbHTMp5LhrpMADBHHqZHUx7/5wqzbdG3jrZvIoZyGZU8sMzmrr6QUAACUWrOHAAAIo0lEQVR4nO2aCUPa2BaAJQkEgRgSiIkBvEpKSKCxkCriQq2Wjssw0+ls0nlvZvr/f8U7NwskbOLSZ9XztVaLIdx8nO1GV1YQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEFiZP1PG8l0OrnzKmRnJ3JENnrg8wcuNJvmi4xEWTc1D8P7t15/u7u5EQqhn7MvQkx2ZSNVkySB8TjaI4oHq7Asq8lyR5K47WIhlU56LrIvwAiwVQMhgRLB3reoDAJBwtJIYZ1twbYFQZCYWjuT2kw+eyf0AsUwRPw4YVzqZIzSPQm/B2IEhtvObL3agSfurGSjFef5kM0WJY7hxk44qUViTljTjihjaMScGk797cHGsxRC4yQjMXHsQyvuRLPjBwhwSNdQWN3aPXj3HCMlNamEsaVu3AkrHU0ewxwdHncNp6fnrLfvfCvPxA1tq9zU5TLMMVG0aJycCJNHQKjYJ8yxS9hcj2qBU2XDTj3uTE+0Gk+HCQ0C6Dzy2IlhTx5wyNnC0f7x/uF+1SC5nm7U32WjBjwzT1XJyvZUCEDg2C2FRJx07KlgOtnvGkRhNetyr6vpum50rFc76a1Csd1up5KPfVH3AYY1Ju4EmopAq2zdIaxCW7KsEXJpRwPFZgTObhlEliGWFEU2r00tZ7w3T88GecrXfJMDK2Llg5TaeXoDXnYlPRkm0GjX19fXTIfV6prnRCMtIZ48nH1cHxUcReufd3Rt72N+sBry9QdRyg8ag3zt6eVPdmVzRjnhYN9zajqOFyeghOzHxB1CGLHjeuPA9K9p5/mLZjMwAl808mdn+dVmIy8+9iXemplOvNphS8L+3mVOJkQjOrSdWPJIl3KkLSkObADI1Y+DVV9K09PSOPuQbzQHP2w89jXeFnAiMLOasZ9Ftr3f6ppaVxi78pzs99gpHOOnQWN19TXgR8vgw8/55mp+87Gv8fYkhXlKfC+2fXjI+YXX+7/npOVMO1E0Yn76etEcOVlt5iFQnqKTFW6RFNuHY6DwSpLA+YcKXWXaCQvlh3R/yQ9iThqv0499gXegaHNTE0o8VHwRHO1HfvE5unSi9SREZh22DlYuVptBSck3Lj4asCUKX+up9KD0ydSQOhdqBWJFaBHFmRUqlHr302u/B71u5AcXvyi5vmUdvNqhPPa1Lk1GWF6KIFXWJUE4qs5VomkOsa7ewHACOZRv/PmZNXJ09qcbxacSJivZ3ePFuRNVQkOlsr5eqXTryow660nRiUJY8/QNVBP486ue8zGstwffhZRkMn0Tu7p+DJFyeMQsp0ZYXwN+O/39D0qOVXqKLE+ZIYScX30a/JnfC5149HcPDt7dvKZk+htNNbAt3eQT/CLKZdU1HKV+eQTNZclo4Xwpa5Wfrjwt532ZzIgWmOIch3SuO0ZESQ8+dL1vuiqvqosWVuC/Ubva2Eqk+FRiHnwioQ5d3btD328tHSdjKRVBVFU4iTujB8H0S29vw84Ztopy6ESHoOn3+1B1XVUtl+cujS5u81skWjLFz3tFWI6qDodD1zIUb+2Kbu6dLlVqqTgBfFSkmphKqPRk4AT+6BOBIstUNqEtGqzIQQoZNGzo17phurACUJMoe6eJQd/JrYfPn83E3BiB4FRBh97Tc0EpgD2/ptUkhg5lN4wrNFK4YlFMhGdXLfAK8woEgTYrjUJkKqOf03vvDSNIKKPjgphEecoJtcKnkg97Wyq7VUjNTZuh61p6r6dTJWF57LHKKe2zo2BYGCuFyLlVred8OSf+VcN1z1NCXyvXMU2zkwuV0GzSLXc4O4t4/kH3BRuLCknC7esQuqZlyGMnrOacrlMkaYm6UoyezlLYv754t1rIOXzSda/vzHQiG9ZltRrUXVpddIo1nLVKuIDCQ+UPRFsyMa+U0MdVtSBWXdOIl0aiHFfWfKgXYZEZoRgxXh7u/uevL46msfL1tdPR6F1L7erquqPRaVeGrFLGA55Mb1LBZz0H8QJSXBNqrlud9+7xqQeRAko2C/NjBF6nXMiY7OQgqmhKK3TiMw4Ygf6N/lDMz52Ul518oVCo/teiBVX+u+78Ss/k1D/m/ylVj/esOoFCVZ/RmAy3WspUL0sZEZ6/YLGJ9P23SVlowXP7jYc6rNJOUZ9wYijduJO1IJU8NbG9s7AtBmQ8SqXSvwb0mKs9rf+ZwHxLzK9nGbGUkS4+fu7Sbj+lRHmvEGjIBVVNlcsLu3Jh876FNruoBfvih7Cph7D21xn8/gBgKWbgBBqt9xWM8HSMr8TLDCTVduACCLyU/u0blgsJ+fmc9Ih1+UbyHhYLxRq3XXAtTfNea5RAMkwA3qtqkDlDdUbfGS03wd+nqHg+0wtjhDK0LNOt+rhQaAHLpI+I7aJHu93ertF7slRIgB8xDFerbbeLmbGTGCUx04KTm9V2Wxw7E2kgQQHzzCghLDvaL2mWBYPKorcxeff88af5GylHoeUAKFGCXBjlRTHO+FvRxIkiZrzzlGb5og+LVRgDXBdaHtQfLWx5Sq/XU+ru3PXCqHLn/Mn6LfhGK2qMsjfUenOtXzDFOL4zbxcSXWbwFtK9yZjw4OD40TcDgWIpkAP6LSccAyBmYCPgLsgfPnW3/KEa0zf7iMdJaMh7bDRhp/wP2lWCa58//oVP8Uik4FS+4omFwIN86DsoQlV3BCQxuF/4AvzdfrYIeXPT0h+bYH18PLzUBTV29Ez+Ljvl7NZ3ryRgtMzFTXjySfytd8o3tODvidHmMQiQpcTwtxxqaQvmn0qU3It08Ouoy0hZpgU/B/yhdhkpMM3Tov8SWPpOU03gXgxMe7mZNvmieDo/Jvr/seSY7//O4cvgWytHEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBEARBHo//AZ4zMNA6PuIYAAAAAElFTkSuQmCC",
        steps: [
          "Kneel on the mat with your big toes touching and knees apart.",
          "Sit back on your heels and bend forward.",
          "Extend your arms in front or beside you.",
          "Rest your forehead on the floor.",
          "Take slow, deep breaths and feel the stretch in your back.",
          "Gently press your chest towards your thighs.",
          "Hold the pose and focus on relaxing each muscle.",
        ],
        benefits: [
          "Calms the brain and reduces anxiety",
          "Relieves stress and fatigue",
          "Stretches the hips, thighs, and ankles",
          "Helps relieve back and neck pain",
          "Promotes better sleep quality",
          "Aids in digestion",
          "Releases tension in shoulders",
          "Promotes mindfulness and meditation",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Easy Pose",
        sanskritName: "Sukhasana",
        image:
          "https://thumbs.dreamstime.com/b/vector-illustration-woman-performing-sukhasana-easy-yoga-pose-woman-performing-yoga-sukhasana-pose-197919351.jpg",
        steps: [
          "Sit cross-legged with spine straight.",
          "Rest your hands on knees (palms up or down).",
          "Close your eyes and focus on breathing.",
          "Roll your shoulders back and down.",
          "Tuck your chin slightly to align your neck.",
          "Keep your feet relaxed and ankles comfortable.",
          "Maintain natural lower back curve.",
        ],
        benefits: [
          "Improves focus and inner calm",
          "Reduces anxiety and stress",
          "Strengthens back muscles",
          "Promotes good posture",
          "Enhances breath awareness",
          "Opens hip joints",
          "Reduces mental fatigue",
          "Balances the nervous system",
        ],
        difficulty: "Beginner",
        duration: "5-10 minutes",
      },
      {
        name: "Downward-Facing Dog",
        sanskritName: "Adho Mukha Svanasana",
        image:
          "https://cdn.vectorstock.com/i/1000v/61/98/adho-mukha-svanasana-or-downward-facing-dog-vector-43616198.jpg",
        steps: [
          "Start on hands and knees.",
          "Lift hips up and straighten legs to form an inverted V.",
          "Press heels towards the floor.",
          "Spread your fingers wide for stability.",
          "Keep arms straight and shoulders away from ears.",
          "Engage your core muscles.",
          "Look between your feet or towards your navel.",
          "Pedal your feet to deepen the stretch.",
        ],
        benefits: [
          "Energizes the body",
          "Relieves mild depression",
          "Strengthens arms and legs",
          "Improves digestion",
          "Stretches entire back body",
          "Increases blood flow to brain",
          "Strengthens wrists and shoulders",
          "Helps prevent osteoporosis",
          "Improves shoulder mobility",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Bridge Pose",
        sanskritName: "Setu Bandhasana",
        image:
          "https://www.gynaecworld.com/pcos/wp-content/uploads/2019/04/setu-bandhasana-min.jpg",
        steps: [
          "Lie on your back.",
          "Bend knees and place feet flat on the ground.",
          "Keep feet hip-width apart and parallel.",
          "Press arms and palms firmly into the ground.",
          "Lift hips upward while keeping shoulders grounded.",
          "Engage your glutes and core muscles.",
          "Interlace fingers beneath your back (optional).",
          "Keep your gaze straight up or close your eyes.",
        ],
        benefits: [
          "Calms the brain and reduces stress",
          "Improves sleep quality",
          "Strengthens the back and glutes",
          "Stimulates thyroid and improves metabolism",
          "Opens chest and improves breathing",
          "Reduces anxiety and fatigue",
          "Helps with mild depression",
          "Relieves menstrual discomfort",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Legs-Up-The-Wall Pose",
        sanskritName: "Viparita Karani",
        image:
          "https://media.yogauonline.com/app/uploads/2023/07/09234339/0-Legs-up-the-Wall-Pose-or-Viparita-Karani-a-restorative-yoga-pose.webp",
        steps: [
          "Sit sideways next to a wall.",
          "Lie down and extend legs vertically up the wall.",
          "Relax arms by your sides.",
        ],
        benefits: [
          "Reduces anxiety and fatigue",
          "Enhances circulation",
          "Calms the mind",
        ],
        difficulty: "Beginner",
        duration: "5-10 minutes",
      },
      {
        name: "Mountain Pose",
        sanskritName: "Tadasana",
        image:
          "https://static.wixstatic.com/media/c70342_ac00f7b27858414d9c28cadce92ca688~mv2.jpg/v1/fill/w_642,h_502,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
        steps: [
          "Stand straight with feet together.",
          "Raise arms overhead and stretch upwards.",
          "Breathe deeply and stay grounded.",
        ],
        benefits: [
          "Improves posture and balance",
          "Increases mental clarity",
          "Stretches the body",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Standing Forward Bend",
        sanskritName: "Uttanasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Stand tall, exhale and bend forward from the hips.",
          "Let your hands touch the floor or ankles.",
          "Relax your neck.",
        ],
        benefits: [
          "Soothes the nervous system",
          "Reduces anxiety and fatigue",
          "Stretches the hamstrings and back",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Cobra Pose",
        sanskritName: "Bhujangasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Lie on your stomach.",
          "Place hands under shoulders, elbows close to body.",
          "Press the tops of your feet into the floor.",
          "Engage your thighs and glutes.",
          "Lift chest off the ground using back strength.",
          "Keep lower ribs on the floor.",
          "Roll shoulders back and down.",
          "Gaze slightly upward without straining neck.",
        ],
        benefits: [
          "Elevates mood and energy levels",
          "Opens the heart and lungs",
          "Strengthens the spine and back muscles",
          "Improves posture",
          "Helps relieve sciatica",
          "Increases flexibility",
          "Stimulates abdominal organs",
          "Reduces fatigue",
          "Helps with mild depression",
        ],
        difficulty: "Beginner",
        duration: "1-3 minutes",
      },
      {
        name: "Warrior I",
        sanskritName: "Virabhadrasana I",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Step one foot forward and bend the knee.",
          "Align front knee over ankle.",
          "Square your hips forward.",
          "Extend arms overhead and gaze forward.",
          "Press the back heel into the floor.",
          "Draw shoulder blades down your back.",
          "Engage your core and lift through the chest.",
          "Keep back leg strong and straight.",
        ],
        benefits: [
          "Strengthens legs and core",
          "Improves balance and stability",
          "Stretches the hips, chest, and shoulders",
          "Builds mental focus and concentration",
          "Strengthens shoulders and arms",
          "Energizes the entire body",
          "Improves posture",
          "Increases stamina and endurance",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds per side",
      },
      {
        name: "Warrior II",
        sanskritName: "Virabhadrasana II",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Step one foot forward and bend the knee.",
          "Extend arms out to the sides, parallel to the floor.",
          "Gaze over your front hand.",
        ],
        benefits: [
          "Strengthens legs, hips, and core",
          "Improves balance",
          "Opens the chest and shoulders",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds per side",
      },
      {
        name: "Triangle Pose",
        sanskritName: "Trikonasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Stand with feet wide apart.",
          "Reach forward with one hand and bring the other hand to the ankle.",
          "Stretch the top arm up, keeping your chest open.",
        ],
        benefits: [
          "Stretches legs, hips, and spine",
          "Improves balance",
          "Opens the chest and shoulders",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds per side",
      },
      {
        name: "Plank Pose",
        sanskritName: "Phalakasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Start in a push-up position with arms straight.",
          "Align wrists directly under shoulders.",
          "Keep your body in a straight line from head to heels.",
          "Engage your core muscles strongly.",
          "Keep neck neutral, gaze at the floor.",
          "Press heels back while reaching crown forward.",
          "Draw shoulder blades down your back.",
          "Breathe steadily and maintain form.",
        ],
        benefits: [
          "Strengthens the core, shoulders, and arms",
          "Improves posture and alignment",
          "Tones the entire body",
          "Builds endurance and stamina",
          "Enhances balance and stability",
          "Improves concentration",
          "Strengthens wrists and forearms",
          "Prepares body for advanced poses",
        ],
        difficulty: "Intermediate",
        duration: "20-30 seconds",
      },
      {
        name: "Boat Pose",
        sanskritName: "Navasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Sit with legs extended straight in front of you.",
          "Bend knees and lift feet off the floor.",
          "Lean back slightly maintaining straight spine.",
          "Extend arms parallel to the ground.",
          "Slowly straighten legs if possible.",
          "Keep chest lifted and core engaged.",
          "Point toes and flex through feet.",
          "Breathe steadily and maintain balance.",
        ],
        benefits: [
          "Strengthens the core and spine",
          "Improves balance and stability",
          "Tones the legs and hip flexors",
          "Stimulates digestion",
          "Enhances focus and concentration",
          "Strengthens lower back muscles",
          "Improves posture",
          "Boosts energy levels",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds",
      },
      {
        name: "Seated Forward Bend",
        sanskritName: "Paschimottanasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Sit with legs extended straight in front of you.",
          "Inhale and lengthen the spine.",
          "Exhale and fold forward, reaching for your feet.",
        ],
        benefits: [
          "Stretches the hamstrings and spine",
          "Calms the mind",
          "Improves flexibility",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds to 1 minute",
      },
      {
        name: "Camel Pose",
        sanskritName: "Ustrasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Kneel with knees hip-width apart.",
          "Place hands on your lower back and arch your back.",
          "Reach for your heels if possible.",
        ],
        benefits: [
          "Opens the chest and shoulders",
          "Stretches the hip flexors",
          "Improves posture",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds",
      },
      {
        name: "Upward-Facing Dog",
        sanskritName: "Urdhva Mukha Svanasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Lie on your stomach and place hands under shoulders.",
          "Lift your chest and thighs off the ground, keeping the legs straight.",
          "Press the tops of your feet into the floor.",
        ],
        benefits: [
          "Strengthens the back, arms, and core",
          "Opens the chest and lungs",
          "Improves posture",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds",
      },
      {
        name: "Crescent Lunge",
        sanskritName: "Anjaneyasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Step one foot forward into a lunge.",
          "Lift arms overhead and sink into the lunge.",
          "Press the back heel towards the floor.",
        ],
        benefits: [
          "Strengthens legs and core",
          "Stretches the hip flexors",
          "Improves balance",
        ],
        difficulty: "Intermediate",
        duration: "30 seconds per side",
      },
      {
        name: "Pigeon Pose",
        sanskritName: "Eka Pada Rajakapotasana",
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        steps: [
          "Start in Downward-Facing Dog.",
          "Bring right knee forward toward right wrist.",
          "Slide left leg back, keeping hips square.",
          "Lower hips toward the floor.",
          "Keep back leg extended and active.",
          "Walk hands forward and lower upper body.",
          "Rest forehead on stacked hands.",
          "Breathe deeply into tight areas.",
        ],
        benefits: [
          "Opens the hips deeply",
          "Stretches hip flexors and thighs",
          "Relieves lower back pain",
          "Stimulates abdominal organs",
          "Releases emotional tension",
          "Improves flexibility",
          "Calms the mind",
          "Reduces sciatic pain",
        ],
        difficulty: "Advanced",
        duration: "30 seconds per side",
      },
    ],
  },
  hindi: hindiData,
  gujarati: gujaratiData,
};

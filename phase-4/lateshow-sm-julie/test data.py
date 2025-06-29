@app.cli.command('seed')
def seed():
    e1 = Episode(title="Episode 1")
    e2 = Episode(title="Episode 2")
    g1 = Guest(name="Guest A")
    g2 = Guest(name="Guest B")
    db.session.add_all([e1, e2, g1, g2])
    db.session.commit()
    print("Seeded!")

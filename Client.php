<?php

abstract class State
{
    protected Bot $bot;

    public function setBot(Bot $bot)
    {
        $this->bot = $bot;
    }

    abstract public function handler();
}

class FindGoldState extends State
{
    public function handler()
    {
        echo 'ищем золото';

        sleep(3);

        $this->bot->setState(new MiningGoldState());
    }
}

class MiningGoldState extends State
{
    public function handler()
    {
        echo 'добываем золото';

        sleep(3);

        $this->bot->setState(new ReturnState());
    }
}

class ReturnState extends State
{
    public function handler()
    {
        echo 'возвращаемся на базу';

        sleep(3);

        $this->bot->setState(new FindGoldState());
    }
}

class Bot
{
    private State $state;

    public function __construct(State $state)
    {
        $this->setState($state);
    }

    public function setState(State $state)
    {
        echo PHP_EOL . 'state: ' . get_class($state) . PHP_EOL;

        $this->state = $state;
        $this->state->setBot($this);
    }

    public function handle()
    {
        $this->state->handler();
    }
}

$bot = new Bot(new FindGoldState());

while (true) {
    $bot->handle();
}

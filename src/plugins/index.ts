import AutenticacaoPlugin from "./autenticacao";
import ContextPlugin from "./context";
import DBs from "./dbs";
import Hash from "./hash";
import { Root } from "./lib";
import Navigation from "./navigation";
import Pages from "./page";
import Repository from "./repository";
import RepositoryMem from "./repositoryMemory";
import RepositorySyncronizer from "./repositorySycronizer";
import Route from "./route";
import Sleep from "./sleep";
import Socketio from "./socket";

export default class Plugins extends Hash(Navigation(Repository(RepositoryMem(Route(Pages(ContextPlugin(Sleep(Socketio(AutenticacaoPlugin(DBs(RepositorySyncronizer(Root)))))))))))) {}